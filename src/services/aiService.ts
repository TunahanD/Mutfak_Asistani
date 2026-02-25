import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Product } from '../interfaces/types';

/**
 * API Anahtarı Konfigürasyonu
 * Güvenlik nedeniyle bu anahtarın .env dosyasında saklanması önerilir.
 * Kullanıcı tarafından manuel olarak doldurulmalıdır.
 */
const API_KEY = 'BURAYA_GEMINI_API_KEY_GELECEK';

// Google Generative AI istemcisini başlat
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Yapay Zeka Tarif Önerisi Arayüzü
 * AI tarafından döndürülen JSON yapısını tanımlar.
 */
export interface RecipeRecommendation {
  recipeName: string;
  description: string;
  ingredients: { name: string; amount: number; unit: string }[];
  instructions: string[];
}

/**
 * Mevcut envantere göre yapay zeka destekli tarif önerisi getirir.
 * 
 * @param products - Kullanıcının dolabındaki mevcut ürünlerin listesi
 * @param type - İstenilen tarif türü (çorba, yemek, tatlı)
 * @returns RecipeRecommendation nesresi veya hata durumunda null
 */
export const getRecipeSuggestion = async (
  products: Product[],
  type: 'çorba' | 'yemek' | 'tatlı'
): Promise<RecipeRecommendation | null> => {
  try {
    // Gemini-Pro modelini seç
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Ürün listesini metin formatına dönüştür
    const inventoryList = products
      .map((p) => `- ${p.name} (${p.amount} ${p.unit})`)
      .join('\n');

    // AI'ya gönderilecek komut (Prompt)
    const prompt = `
      Sen profesyonel bir aşçısın. Aşağıdaki listede bulunan malzemeleri kullanarak bana bir ${type} tarifi öner.
      
      Mevcut Envanter:
      ${inventoryList}
      
      Kritik Kurallar:
      1. Sadece listedeki malzemeleri kullanmaya özen göster (tuz, su, yağ gibi temel malzemeler hariç).
      2. Yanıtı SADECE geçerli bir JSON formatında ver. Başka hiçbir açıklama ekleme.
      3. JSON şeması şu şekilde olmalıdır:
      {
        "recipeName": "Tarif Adı",
        "description": "Kısa ve iştah açıcı bir açıklama",
        "ingredients": [
          {"name": "Malzeme Adı", "amount": 0, "unit": "birim"} 
        ],
        "instructions": ["Adım 1", "Adım 2", ...]
      }
      4. ÖNEMLİ: "ingredients" listesindeki "name" alanı, yukarıdaki envanter listesindeki ürün isimleriyle BİREBİR AYNI olmalıdır. Harf hatası yapma.
      5. Miktarlar (amount) sayısal (number) olmalıdır.
    `;

    // AI modelinden yanıt al
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Markdown kod bloklarını temizle (```json ... ```)
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // JSON'ı parse et ve döndür
    return JSON.parse(jsonString) as RecipeRecommendation;
  } catch (error) {
    console.error('AI Servisi Hatası:', error);
    return null;
  }
};

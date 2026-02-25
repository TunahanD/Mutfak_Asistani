import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Product } from '../interfaces/types';

/**
 * API Anahtarı Konfigürasyonu
 * Güvenlik nedeniyle bu anahtarın .env dosyasında saklanması önerilir.
 * Kullanıcı tarafından manuel olarak doldurulmalıdır.
 */
const API_KEY = 'AIzaSyDxeJMexznmHwS75UmpJQYNip7lnuKvLSk';

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
    // Gemini-1.5-Flash modelini seç (Daha hızlı ve güncel)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      2. Yanıtı SADECE geçerli bir JSON formatında ver. Başka hiçbir açıklama, önsöz veya son söz ekleme.
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

    // JSON temizleme ve parse etme
    // İlk '{' karakterinden son '}' karakterine kadar olan kısmı al
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error('AI geçerli bir JSON formatı döndürmedi.');
    }

    const jsonString = text.substring(firstBrace, lastBrace + 1);
    
    // JSON'ı parse et ve döndür
    return JSON.parse(jsonString) as RecipeRecommendation;
  } catch (error) {
    console.error('AI Servisi Hatası:', error);
    return null;
  }
};

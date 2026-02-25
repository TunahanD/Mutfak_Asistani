import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Product } from '../interfaces/types';

// NOT: Bu anahtarı normalde .env dosyasında saklamalıyız,
// ancak kullanıcı isteği üzerine şimdilik boş bırakıyoruz.
// Kullanıcı burayı kendi API anahtarı ile dolduracak.
const API_KEY = 'BURAYA_GEMINI_API_KEY_GELECEK';

const genAI = new GoogleGenerativeAI(API_KEY);

export interface RecipeRecommendation {
  recipeName: string;
  description: string;
  ingredients: { name: string; amount: number; unit: string }[];
  instructions: string[];
}

export const getRecipeSuggestion = async (
  products: Product[],
  type: 'çorba' | 'yemek' | 'tatlı'
): Promise<RecipeRecommendation | null> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const inventoryList = products
      .map((p) => `- ${p.name} (${p.amount} ${p.unit})`)
      .join('\n');

    const prompt = `
      Sen profesyonel bir aşçısın. Elimdeki malzemelere göre bana bir ${type} tarifi öner.
      
      Elimdeki Malzemeler:
      ${inventoryList}
      
      Kurallar:
      1. Sadece elimdeki malzemeleri kullanarak (veya çok temel evde bulunabilecek tuz, su, yağ gibi malzemeler ekleyerek) yapılabilecek en iyi ${type} tarifini ver.
      2. Cevabı sadece geçerli bir JSON formatında ver. Başka hiçbir metin ekleme.
      3. JSON formatı şöyle olmalı:
      {
        "recipeName": "Tarif Adı",
        "description": "Kısa ve iştah açıcı bir açıklama",
        "ingredients": [
          {"name": "Malzeme Adı", "amount": 0, "unit": "birim"} 
        ],
        "instructions": ["Adım 1", "Adım 2", ...]
      }
      4. "ingredients" kısmındaki malzemeler, benim stoğumdan düşülecek şekilde ayarlanmalı. Miktarlar sayısal olmalı.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSON temizliği (Markdown bloklarını kaldırmak için)
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(jsonString) as RecipeRecommendation;
  } catch (error) {
    console.error('Yapay zeka hatası:', error);
    return null;
  }
};

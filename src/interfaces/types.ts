
export type Unit = 'ml' | 'lt' | 'gr' | 'kg' | 'adet';

export type Category = 'Sıvı' | 'Katı' | 'Meyve/Sebze' | 'Atıştırmalık' | 'Diğer';

export interface Product {
  id: string;
  name: string;
  amount: number;
  unit: Unit;
  category: Category;
  expiryDate?: string; // Opsiyonel son kullanma tarihi
}

export const UNIT_OPTIONS: Unit[] = ['ml', 'lt', 'gr', 'kg', 'adet'];
export const CATEGORY_OPTIONS: Category[] = ['Sıvı', 'Katı', 'Meyve/Sebze', 'Atıştırmalık', 'Diğer'];

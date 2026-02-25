
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../interfaces/types';

/**
 * Envanter Durum Yönetimi Arayüzü
 * Context üzerinden erişilebilecek metod ve verileri tanımlar.
 */
interface InventoryContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

/**
 * Custom Hook: InventoryContext'e erişim sağlar.
 * Bileşenlerde context kullanımını kolaylaştırır ve tip güvenliği sunar.
 */
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory, bir InventoryProvider içerisinde kullanılmalıdır.');
  }
  return context;
};

/**
 * Inventory Provider Bileşeni
 * Tüm uygulama genelinde envanter verilerini yönetir ve sağlar.
 * Verileri localStorage üzerinde kalıcı hale getirir.
 */
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Başlangıç durumunu localStorage'dan oku
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedProducts = localStorage.getItem('inventory');
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('LocalStorage okuma hatası:', error);
      return [];
    }
  });

  // Ürünler her değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    try {
      localStorage.setItem('inventory', JSON.stringify(products));
    } catch (error) {
      console.error('LocalStorage yazma hatası:', error);
    }
  }, [products]);

  // Yeni ürün ekleme fonksiyonu
  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  // Ürün silme fonksiyonu (ID'ye göre)
  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Ürün güncelleme fonksiyonu (Miktar değişimi vb. için)
  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  return (
    <InventoryContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </InventoryContext.Provider>
  );
};

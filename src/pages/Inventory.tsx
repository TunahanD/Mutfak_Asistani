
import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Product, UNIT_OPTIONS, CATEGORY_OPTIONS, Unit, Category } from '../interfaces/types';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const { products, addProduct, removeProduct } = useInventory();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<string>(''); // Changed to string for input
  const [unit, setUnit] = useState<Unit>('adet');
  const [category, setCategory] = useState<Category>('Diğer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const newProduct: Product = {
      id: uuidv4(),
      name,
      amount: parseFloat(amount),
      unit,
      category,
    };

    addProduct(newProduct);
    setName('');
    setAmount('');
    setUnit('adet');
    setCategory('Diğer');
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Ana Sayfa</Link>
      <h1 className="text-3xl font-bold mb-6">Mutfak Dolabım</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ürün Ekleme Formu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Yeni Ürün Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Ürün Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Süt"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Miktar</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Birim</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Dolaba Ekle
            </button>
          </form>
        </div>

        {/* Ürün Listesi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dolaptakiler</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">Dolabınız şu an boş.</p>
          ) : (
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium text-lg">{product.name}</span>
                    <div className="text-sm text-gray-600">
                      {product.amount} {product.unit} • <span className="text-gray-500 italic">{product.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;

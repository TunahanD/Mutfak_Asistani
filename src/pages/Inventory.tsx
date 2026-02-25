
import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { UNIT_OPTIONS, CATEGORY_OPTIONS } from '../interfaces/types';
import type { Product, Unit, Category } from '../interfaces/types';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

/**
 * Envanter (Dolap) Sayfası
 * Kullanıcının dolabındaki ürünleri listelediği, ekleyip çıkarabildiği ana yönetim sayfasıdır.
 */
const Inventory = () => {
  const { products, addProduct, removeProduct } = useInventory();
  
  // Form State Yönetimi
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<string>(''); 
  const [unit, setUnit] = useState<Unit>('adet');
  const [category, setCategory] = useState<Category>('Diğer');

  /**
   * Yeni ürün ekleme formunun gönderilmesi
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const newProduct: Product = {
      id: uuidv4(), // Benzersiz ID oluştur
      name,
      amount: parseFloat(amount),
      unit,
      category,
    };

    addProduct(newProduct);
    
    // Formu temizle
    setName('');
    setAmount('');
    setUnit('adet');
    setCategory('Diğer');
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Link to="/" className="text-orange-700 hover:text-orange-900 mb-8 inline-flex items-center font-bold text-lg transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform inline-block mr-2">&larr;</span> Ana Sayfa
      </Link>
      
      <h1 className="text-5xl font-black mb-10 text-amber-900 text-center drop-shadow-sm tracking-tight">
        Mutfak Dolabım
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
        {/* Sol Taraf: Ürün Ekleme Formu */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-xl border-2 border-orange-100 sticky top-6 transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-black mb-6 text-orange-800 border-b-2 border-orange-100 pb-4 flex items-center gap-3">
             <span className="text-3xl">🆕</span> Yeni Ürün Ekle
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-orange-900 mb-2 font-bold text-sm uppercase tracking-wide">ÜRÜN ADI</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-orange-100 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 bg-orange-50/50 transition-all font-medium text-gray-700 placeholder-orange-300"
                placeholder="Örn: Süt, Yumurta..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-orange-900 mb-2 font-bold text-sm uppercase tracking-wide">MİKTAR</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-orange-100 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 bg-orange-50/50 transition-all font-medium text-gray-700"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-orange-900 mb-2 font-bold text-sm uppercase tracking-wide">BİRİM</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full border-2 border-orange-100 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 bg-orange-50/50 transition-all appearance-none cursor-pointer font-medium text-gray-700"
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-orange-900 mb-2 font-bold text-sm uppercase tracking-wide">KATEGORİ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full border-2 border-orange-100 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 bg-orange-50/50 transition-all appearance-none cursor-pointer font-medium text-gray-700"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transform transition-all hover:-translate-y-1 active:scale-95 text-lg flex items-center justify-center gap-2"
            >
              <span>➕</span> Dolaba Ekle
            </button>
          </form>
        </div>

        {/* Sağ Taraf: Ürün Listesi */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-xl border-2 border-orange-100 h-[calc(100vh-200px)] min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 border-b-2 border-orange-100 pb-4 flex-shrink-0">
            <h2 className="text-2xl font-black text-orange-800 flex items-center gap-3">
               <img src="/ürünler.png" alt="Ürünler" className="w-10 h-10 object-contain" /> Dolaptakiler
            </h2>
            <span className="bg-orange-100 text-orange-800 text-sm font-black px-4 py-2 rounded-full border border-orange-200 shadow-sm">
              {products.length} Ürün
            </span>
          </div>
          
          <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar space-y-3 pb-2">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                <span className="text-8xl mb-6 grayscale opacity-50">🥕</span>
                <p className="text-xl font-bold text-gray-500">Dolabınız bomboş!</p>
                <p className="text-md mt-2">Sol taraftan taze malzemeler ekleyin.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {products.map((product) => (
                  <li key={product.id} className="group flex justify-between items-center bg-orange-50/30 hover:bg-orange-50 p-5 rounded-2xl border border-orange-100 hover:border-orange-300 transition-all shadow-sm hover:shadow-md transform hover:-translate-x-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-orange-100 p-2">
                        <img src="/ürün.png" alt="Ürün" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <span className="font-bold text-lg text-gray-800 block">{product.name}</span>
                        <div className="text-sm text-gray-600 mt-0.5 flex items-center gap-2">
                          <span className="bg-white px-2 py-0.5 rounded-lg border border-orange-100 text-orange-700 font-bold text-xs uppercase tracking-wider shadow-sm">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-xl text-orange-600 bg-white px-3 py-1 rounded-lg shadow-sm border border-orange-50">
                        {product.amount} <span className="text-sm font-medium text-gray-500">{product.unit}</span>
                      </span>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 focus:opacity-100"
                        title="Ürünü Sil"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Alt Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

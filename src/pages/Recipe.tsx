import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Link } from 'react-router-dom';
import { getRecipeSuggestion } from '../services/aiService';
import type { RecipeRecommendation } from '../services/aiService';

/**
 * Tarif Öneri Sayfası
 * Kullanıcının dolabındaki malzemelere göre yapay zeka destekli tarif önerileri aldığı sayfadır.
 */
const Recipe = () => {
  const { products, updateProduct, removeProduct } = useInventory(); // updateProduct ve removeProduct eklendi
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<RecipeRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Seçilen türe göre yapay zekadan tarif ister.
   * @param type - İstenilen yemek türü (çorba, yemek, tatlı)
   */
  const handleGetRecipe = async (type: 'çorba' | 'yemek' | 'tatlı') => {
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      if (products.length === 0) {
        setError('Dolabınızda hiç malzeme yok! Önce malzeme ekleyin.');
        setLoading(false);
        return;
      }

      const suggestion = await getRecipeSuggestion(products, type);
      if (suggestion) {
        setRecipe(suggestion);
      } else {
        setError('Tarif oluşturulamadı. Lütfen API anahtarınızı kontrol edin veya tekrar deneyin.');
      }
    } catch (err) {
      setError('Bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * "Tarifi Yaptım" butonuna tıklandığında çalışır.
   * Tarifteki malzemeleri envanterden düşer.
   */
  const handleCookRecipe = () => {
    if (!recipe) return;

    if (!window.confirm('Bu tarifi yaptığınızı onaylıyor musunuz? Kullanılan malzemeler stoktan düşülecektir.')) {
      return;
    }

    let updatedCount = 0;

    // Tarifteki her malzeme için döngü
    recipe.ingredients.forEach((ingredient) => {
      // Envanterde bu malzemeyi ismine göre bul (Büyük/küçük harf duyarsız arama yapılabilir ama AI promptu birebir eşleşme istiyor)
      const productInInventory = products.find(
        (p) => p.name.toLowerCase() === ingredient.name.toLowerCase()
      );

      if (productInInventory) {
        const newAmount = productInInventory.amount - ingredient.amount;

        if (newAmount <= 0) {
          // Eğer miktar 0 veya altına düşerse ürünü tamamen sil
          removeProduct(productInInventory.id);
        } else {
          // Miktarı güncelle
          updateProduct(productInInventory.id, { amount: newAmount });
        }
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      alert(`Afiyet olsun! ${updatedCount} adet malzeme stoğunuzdan güncellendi.`);
      setRecipe(null); // Tarifi ekrandan temizle
    } else {
      alert('Stokta eşleşen malzeme bulunamadı veya güncelleme yapılamadı.');
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Link to="/" className="text-orange-700 hover:text-orange-900 mb-8 inline-flex items-center font-bold text-lg transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform inline-block mr-2">&larr;</span> Ana Sayfa
      </Link>
      
      <h1 className="text-5xl font-black mb-10 text-amber-900 text-center drop-shadow-sm tracking-tight">
        Ne Pişirsem? <span className="text-6xl align-middle">🍳</span>
      </h1>
      
      <p className="text-center text-amber-900 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">
        Dolabındaki <span className="font-black text-orange-600 text-2xl mx-1">{products.length}</span> çeşit malzeme ile sana özel tarifler önerelim.
      </p>

      {/* Kategori Seçim Butonları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
        <button
          onClick={() => handleGetRecipe('çorba')}
          disabled={loading}
          className="bg-white hover:bg-orange-50 border-4 border-orange-100 hover:border-orange-300 text-orange-800 font-bold py-8 px-6 rounded-[2rem] shadow-xl hover:shadow-2xl transform transition-all hover:-translate-y-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-4 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-6xl group-hover:scale-110 transition-transform drop-shadow-sm">🥣</span>
          <span className="text-2xl relative">Çorba Öner</span>
        </button>
        <button
          onClick={() => handleGetRecipe('yemek')}
          disabled={loading}
          className="bg-white hover:bg-orange-50 border-4 border-orange-100 hover:border-orange-300 text-orange-800 font-bold py-8 px-6 rounded-[2rem] shadow-xl hover:shadow-2xl transform transition-all hover:-translate-y-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-4 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-6xl group-hover:scale-110 transition-transform drop-shadow-sm">🍲</span>
          <span className="text-2xl relative">Ana Yemek Öner</span>
        </button>
        <button
          onClick={() => handleGetRecipe('tatlı')}
          disabled={loading}
          className="bg-white hover:bg-orange-50 border-4 border-orange-100 hover:border-orange-300 text-orange-800 font-bold py-8 px-6 rounded-[2rem] shadow-xl hover:shadow-2xl transform transition-all hover:-translate-y-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-4 group relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-6xl group-hover:scale-110 transition-transform drop-shadow-sm">🍰</span>
          <span className="text-2xl relative">Tatlı Öner</span>
        </button>
      </div>

      {/* Yükleniyor Göstergesi */}
      {loading && (
        <div className="text-center py-16 bg-white/50 rounded-3xl backdrop-blur-sm border-2 border-dashed border-orange-200">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-orange-800 font-medium">Yapay zeka mutfakta malzemeleri karıştırıyor...</p>
        </div>
      )}

      {/* Hata Mesajı */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl relative mb-8 flex items-center gap-4 shadow-sm" role="alert">
          <span className="text-2xl">⚠️</span>
          <div>
            <strong className="font-bold">Bir Sorun Oluştu: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {/* Tarif Kartı */}
      {recipe && (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100 transform transition-all animate-fade-in">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black mb-3">{recipe.recipeName}</h2>
                <p className="text-orange-50 opacity-90 text-lg italic">{recipe.description}</p>
              </div>
              <span className="text-5xl">✨</span>
            </div>
          </div>
          
          <div className="p-8 grid md:grid-cols-2 gap-12 bg-white">
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
              <h3 className="text-2xl font-bold mb-6 text-orange-800 border-b border-orange-200 pb-3 flex items-center gap-2">
                <span>🛒</span> Malzemeler
              </h3>
              <ul className="space-y-4">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index} className="flex items-center text-gray-700 bg-white p-3 rounded-xl shadow-sm border border-orange-50">
                    <span className="w-3 h-3 bg-orange-400 rounded-full mr-4 shadow-sm"></span>
                    <span className="font-bold text-orange-700 mr-2">{ing.amount} {ing.unit}</span>
                    <span className="font-medium">{ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-800 border-b border-orange-200 pb-3 flex items-center gap-2">
                <span>👨‍🍳</span> Hazırlanışı
              </h3>
              <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex group">
                    <span className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black mr-4 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1 font-medium">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="bg-orange-50 p-8 text-center border-t border-orange-100">
            <button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 px-12 rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto text-xl"
              onClick={handleCookRecipe}
            >
              <span>✅</span> Tarifi Yaptım (Stoktan Düş)
            </button>
            <p className="text-sm text-gray-500 mt-4 italic">
              * Bu işlem kullanılan malzemeleri otomatik olarak dolabınızdan silecektir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;

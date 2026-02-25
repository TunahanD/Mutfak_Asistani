import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Link } from 'react-router-dom';
import { getRecipeSuggestion } from '../services/aiService';
import type { RecipeRecommendation } from '../services/aiService';

const Recipe = () => {
  const { products } = useInventory();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<RecipeRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Ana Sayfa</Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Ne Pişirsem?</h1>
      
      <p className="text-center text-gray-600 mb-8">
        Dolabındaki {products.length} çeşit malzeme ile sana özel tarifler önerelim.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => handleGetRecipe('çorba')}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🥣 Çorba Öner
        </button>
        <button
          onClick={() => handleGetRecipe('yemek')}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🍲 Ana Yemek Öner
        </button>
        <button
          onClick={() => handleGetRecipe('tatlı')}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🍰 Tatlı Öner
        </button>
      </div>

      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yapay zeka mutfakta çalışıyor...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Hata: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {recipe && (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold">{recipe.recipeName}</h2>
            <p className="opacity-90 mt-2">{recipe.description}</p>
          </div>
          
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Malzemeler</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {ing.amount} {ing.unit} {ing.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Hazırlanışı</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 mt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 text-center border-t">
            <button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition"
              onClick={() => alert('Bu özellik yakında eklenecek: Malzemeleri stoktan düş!')}
            >
              ✅ Tarifi Yaptım (Stoktan Düş)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;

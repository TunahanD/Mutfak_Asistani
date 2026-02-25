
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Mutfak Asistanı</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Dolabınızdaki ürünleri takip edin ve yapay zeka destekli tarif önerileri alın.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link 
          to="/inventory" 
          className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-200"
        >
          <span className="text-4xl mb-4">🧊</span>
          <span className="text-xl font-semibold text-gray-800">Dolabım</span>
          <span className="text-sm text-gray-500 mt-2 text-center">Malzemeleri ekle, çıkar ve yönet</span>
        </Link>

        <Link 
          to="/recipe" 
          className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-200"
        >
          <span className="text-4xl mb-4">🧑‍🍳</span>
          <span className="text-xl font-semibold text-gray-800">Ne Pişirsem?</span>
          <span className="text-sm text-gray-500 mt-2 text-center">Yapay zeka ile tarif önerisi al</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

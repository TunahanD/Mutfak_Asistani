
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      
      <div className="absolute top-10 left-10 text-9xl opacity-5 pointer-events-none rotate-12">🥕</div>
      <div className="absolute bottom-10 right-10 text-9xl opacity-5 pointer-events-none -rotate-12">🍳</div>
      <div className="absolute top-1/3 right-1/4 text-8xl opacity-5 pointer-events-none rotate-45">🥦</div>

      <div className="text-7xl mb-6 drop-shadow-md">👨‍🍳</div>
      <h1 className="text-6xl font-black mb-6 text-orange-600 drop-shadow-sm tracking-tight text-center">
        Mutfak Asistanı
      </h1>
      <p className="text-2xl text-amber-900 mb-16 text-center max-w-2xl font-light leading-relaxed">
        Dolabınızdaki ürünleri takip edin, israfı önleyin ve <br/>
        <span className="font-bold text-orange-600">yapay zeka</span> ile lezzetli tarifler keşfedin.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl px-4 z-10">
        <Link 
          to="/inventory" 
          className="group flex flex-col items-center justify-center bg-white p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-orange-50 hover:border-orange-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img src="/dolap.png" alt="Dolabım" className="w-24 h-24 mb-6 group-hover:scale-110 transition-transform drop-shadow-sm object-contain" />
          <span className="text-3xl font-black text-gray-800 mb-3 relative">Dolabım</span>
          <span className="text-gray-500 text-center px-4 font-medium relative">Malzemeleri ekle, stok durumunu yönet</span>
        </Link>

        <Link 
          to="/recipe" 
          className="group flex flex-col items-center justify-center bg-white p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-orange-50 hover:border-orange-200 relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-7xl mb-8 group-hover:scale-110 transition-transform drop-shadow-sm">🥘</span>
          <span className="text-3xl font-black text-gray-800 mb-3 relative">Ne Pişirsem?</span>
          <span className="text-gray-500 text-center px-4 font-medium relative">Mevcut malzemelerle yapay zeka tarifleri al</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

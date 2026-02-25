
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Mutfak Asistanı</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Mutfak yönetimini kolaylaştırın! Stoklarınızı takip edin ve yapay zeka destekli tarif önerileri alın.
      </p>
      <div className="flex space-x-4">
        <Link to="/inventory" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
          Dolabım
        </Link>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
          Tarif Öner
        </button>
      </div>
    </div>
  );
};

export default Home;

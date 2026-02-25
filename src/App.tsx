
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Recipe from './pages/Recipe';
import { InventoryProvider } from './context/InventoryContext';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/recipe" element={<Recipe />} />
            {/* Diğer rotalar buraya gelecek */}
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;

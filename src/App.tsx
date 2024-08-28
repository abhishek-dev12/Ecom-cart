import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider, useToast } from './context/ToastContext';
import Toast from './components/Toast';
import Home from './pages/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './pages/Cart';
import Search from './components/Search';

function AppContent() {
  const { toast, hideToast } = useToast();

  return (
    <CartProvider>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </CartProvider>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import Navigation from '../components/Navigaion';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setProducts(cartItems);
    updateTotals(cartItems);
  };

  const updateTotals = (items: Product[]) => {
    const total = items.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
    const itemCount = items.reduce((acc, product) => acc + (product.quantity || 1), 0);
    setSubtotal(total);
    setTotalItems(itemCount);
  };

  const removeItem = (id: number) => {
    const updatedCart = products.filter(product => product.id !== id);
    setProducts(updatedCart);
    updateTotals(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = products.map(product => 
      product.id === id ? { ...product, quantity } : product
    );
    setProducts(updatedCart);
    updateTotals(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const discount = subtotal * 0.1; 
  const total = subtotal - discount;

  return (
    <>
      <Navigation/>
      <div className="container mx-auto p-4">
        {products.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Oops! Your cart is empty.</h2>
            <p className="mb-4">Let's add some items to it!</p>
            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Go to Home Page
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              {products.map(product => (
                <CartProduct 
                  key={product.id} 
                  product={product} 
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
            <div className="md:w-1/3">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Price Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total Amount</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded mt-4">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
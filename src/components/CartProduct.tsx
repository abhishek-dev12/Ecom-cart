import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { useCartContext } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    // rate: number;
    // count: number;
  };
  quantity: number;
}

interface CartProductProps {
  product: Product;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartProduct: React.FC<CartProductProps> = ({ product, onRemove }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const { showToast } = useToast();
  const { removeFromCart, updateQuantity } = useCartContext();

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
    if (newQuantity > product.quantity) {
      showToast(`${product.title} quantity has been increased to ${newQuantity}`, 'info');
    }
  }, [product.id, product.title, product.quantity, updateQuantity, showToast]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    handleQuantityChange(newQuantity);
  };

  useEffect(() => {
    if (quantity !== product.quantity) {
      setQuantity(product.quantity);
    }
  }, [product.quantity]);

  const handleRemove = () => {
    removeFromCart(product.id);
    onRemove(product.id);
    showToast('Product removed from cart successfully!', 'info');
  };

  return (
    <div className="flex items-center border rounded-lg p-4 mb-4">
      <div className="w-32 h-32 mr-4 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain"
        />
        <select 
          className="border my-2 px-2 py-1 mx-8 rounded"
          value={quantity}
          onChange={handleSelectChange}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-sm font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.category}</p>
          <div className="flex items-center mt-1">
            {/* <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating.rate))}</span> */}
            {/* <span className="text-gray-600 text-sm ml-1">({product.rating.count} reviews)</span> */}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4  mt-2">
          <p className="text-xl font-bold">${(product.price * quantity).toFixed(2)}</p>
          <button 
            onClick={handleRemove}
            className="bg-red-500 p-2 rounded-md hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

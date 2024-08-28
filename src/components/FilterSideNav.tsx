import React, { useState } from 'react';
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

interface FilterSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { price?: string; category?: string }) => void;
}

const FilterSideNav: React.FC<FilterSideNavProps> = ({ isOpen, onClose, onApply }) => {
  const [activeTab, setActiveTab] = useState<'price' | 'categories'>('price');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const priceRanges = [
    '0-100',
    '100-1000',
    '1000-10000'
  ];

  const categories = [
    "jewelry",
    "men's clothing",
    "electronics"
  ];

  const handleApply = () => {
    const filters: { price?: string; category?: string } = {};
    if (selectedPrice) filters.price = selectedPrice;
    if (selectedCategory) filters.category = selectedCategory;
    onApply(filters);
    onClose();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-4 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex">
        <div className="w-1/3 border-r">
          <ul>
            <li
              className={`p-2 cursor-pointer ${activeTab === 'price' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => setActiveTab('price')}
            >
              Price
            </li>
            <li
              className={`p-2 cursor-pointer ${activeTab === 'categories' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </li>
          </ul>
        </div>
        <div className="w-2/3 p-2">
          {activeTab === 'price' && (
            <div>
              {priceRanges.map((range) => (
                <div key={range} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value={range}
                      checked={selectedPrice === range}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="mr-2"
                    />
                    {range}
                  </label>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'categories' && (
            <div>
              {categories.map((category) => (
                <div key={category} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleApply}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSideNav;
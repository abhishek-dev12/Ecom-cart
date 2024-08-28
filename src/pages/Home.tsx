import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Navigation from '../components/Navigaion';
import Filter from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching products. Please try again later.');
      setLoading(false);
    }
  };

  const handleApplyFilters = (filters: { price?: string; category?: string }) => {
    let filtered = [...products];

    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      {/* <Search /> */}
      <Filter onApplyFilters={handleApplyFilters} />
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="text-2xl font-bold my-4">Products</h1>
        {filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">No products found!</strong>
              <span className="block sm:inline"> Try adjusting your filters or search query.</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="block h-full">
                <Card product={product} className="h-full" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
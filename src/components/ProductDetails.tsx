import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useToast } from '../context/ToastContext'; // Update this import
import { useCartContext } from '../context/CartContext';
import Navigation from './Navigaion';
import LoadingSpinner from './LoadingSpinner';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

function ProductDetails() {
  
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching product. Please try again later.');
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      showToast('Product added to cart successfully!', 'success');
      navigate('/cart');
    }
  };

  if (loading) return <LoadingSpinner/>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  // Create an array of images (in this case, just one image repeated)
  const images = [product.image, product.image, product.image];
  
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navigation />
      <div className="flex-grow w-full ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div>{error}</div>
          ) : !product ? (
            <div>Product not found</div>
          ) : (
            <>
              <div className="max-w-md mx-auto ">
                <Slider {...settings}>
                  {images.map((img, index) => (
                    <div key={index} className="outline-none">
                      <img src={img} alt={`${product.title} - view ${index + 1}`} className="w-full h-64 object-contain" />
                    </div>
                  ))}
                </Slider>
              </div>
              <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
              <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
              <p className="mt-4">{product.description}</p>
              <div className='flex gap-4 justify-center mt-4'>
                <button 
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Buy now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
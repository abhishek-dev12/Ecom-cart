
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CardProps {
  product: Product;
  className?:string;
}

function Card({ product }: CardProps) {
  // const navigate = useNavigate();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-full">
      <div className="h-48 p-4 flex items-center justify-center bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-sm font-semibold mb-1">
          {truncateText(product.title, 40)}
        </h2>
        <p className="text-xs mb-1 text-gray-600">
          {product.category}
        </p>
        <p className="text-xs mb-2">
          {truncateText(product.description, 100)}
        </p>
        <p className="text-md font-bold mt-auto">
          ${product.price.toFixed(2)}
        </p>
        <button 
          // onClick={addToCart}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          explore
        </button>
      </div>
    </div>
  );
}

export default Card;
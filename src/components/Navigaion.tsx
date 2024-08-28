import { ShoppingCartIcon, ArrowLongLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import useCustomNavigation from '../hooks/useCustomNavigation';
import { useCartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const { goBack } = useCustomNavigation();
  const { getTotalItems } = useCartContext();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div> 
      <div className='px-4 py-2 flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <button onClick={goBack}>
            <ArrowLongLeftIcon className='size-5' />
          </button>
          <Link to={'/'} className='font-semibold'>shoppingMart</Link>
        </div>
        <div className='flex gap-4 items-center'>
          <button onClick={handleSearchClick}>
            <MagnifyingGlassIcon className='size-5' />
          </button>
          <div className="relative">
            <Link to={'/cart'}>
              <ShoppingCartIcon className='size-5' />
            </Link>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </div>
          <button className='py-1 text-md'>Login</button>
        </div>
      </div>
    </div>
  )
}

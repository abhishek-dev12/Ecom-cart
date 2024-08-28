import { useNavigate, useLocation } from 'react-router-dom';

function useCustomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.pathname === '/cart') {
      // If in cart, go back to the previous product page or home
      navigate(-1);
    } else if (location.pathname.startsWith('/product/')) {
      // If on a product page, go back to home
      navigate('/');
    } else {
      // Default case: go to home
      navigate('/');
    }
  };

  return { goBack };
}

export default useCustomNavigation
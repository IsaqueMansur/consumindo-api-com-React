import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function PrivateRoute() {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) toast.warn('Você precisa estar logado !');
  return isLoggedIn ? (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Outlet />
  ) : (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Navigate to="/login" state={location.pathname} />
  );
}

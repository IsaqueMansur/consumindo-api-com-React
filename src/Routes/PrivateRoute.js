import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
  const location = useLocation();
  const isLoggedIn = true;
  return isLoggedIn ? (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Outlet />
  ) : (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Navigate to="/login" state={location.pathname} />
  );
}

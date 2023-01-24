import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  tokenRegistration,
  userDetails,
  viewMode,
} from '../features/users/userDetailsSlice';
import jwtDecode, { JwtPayload } from 'jwt-decode';

const useAuth = () => {
  const { token } = useAppSelector((state) => state.userDetails);
  const dispatch = useAppDispatch();
  if (token) {
    const { exp } = jwtDecode<JwtPayload>(token);
    const expirationTime: any = exp ? exp * 1000 - 60000 : 0;
    if (Date.now() >= expirationTime) {
      dispatch(tokenRegistration(''));
      dispatch(userDetails({}));
      dispatch(viewMode(false));
    }
  }

  return token ? true : false;
};

export const ProtectedRoutes = () => {
  const authenticated = useAuth();
  return authenticated ? <Outlet /> : <Navigate to='/' />;
};

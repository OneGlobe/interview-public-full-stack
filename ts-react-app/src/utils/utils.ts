import { AuthContextType } from '../contexts/AuthContext';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const checkValidToken = (loadedAuth: Partial<AuthContextType>) => {
  const valid =
    loadedAuth.isLoading === false &&
    loadedAuth.isAuthenticated &&
    loadedAuth.user !== undefined &&
    loadedAuth.user?.username !== undefined;
  return valid;
};

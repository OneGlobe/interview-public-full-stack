export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const checkValidToken = (loadedAuth) => {
  const valid =
    loadedAuth.isLoading === false &&
    loadedAuth.isAuthenticated &&
    loadedAuth.user !== undefined &&
    loadedAuth.user?.username !== undefined;
  return valid;
};

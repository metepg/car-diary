import { Route } from '../models/Route.tsx';

export const getRoutesFromLocalStorage = (): Route[] | undefined => {
  const routesFromStorage = localStorage.getItem('routes');
  return routesFromStorage ? JSON.parse(routesFromStorage) : undefined;
};

export const saveRoutesToLocalStorage = (routes: Route[] | undefined): void => {
  if (!routes) return;
  localStorage.setItem('routes', JSON.stringify(routes));
};
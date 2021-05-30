import {
  Route,
  RouteProps,
  matchPath,
} from 'react-router-dom';

import { GuardFunction } from '../types/guard';

export type ProtectedRouteProps = RouteProps & {
  guards: GuardFunction[];
  fallback: (routeProps: RouteProps) => JSX.Element | null;
};

export const ProtectedRoute = ({
  fallback,
  guards,
  ...rest
}: ProtectedRouteProps) => {
  const {
    pathname,
  } = window.location;
  const matchResult = matchPath(pathname, rest);
  const hasMatchedRoute = !!matchResult;

  /**
   * Make sure the user is accessing the path it intends to access
   * before running any guard functions.
   * Match the route first before validating (running the guards)
   */
  if (hasMatchedRoute) {
    const guardArgs = rest;
    const canBeRendered = guards.every(guard => guard(guardArgs));

    if (guards.length && !canBeRendered) {  
      const fallbackArgs = rest;
      return fallback(fallbackArgs);
    }
  }

  return (
    <Route
      {...rest}
    />
  );
};

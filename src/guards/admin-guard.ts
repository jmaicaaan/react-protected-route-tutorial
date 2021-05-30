import { GuardFunction } from '../types/guard';

import { tryCatchSync } from '../utils/tryCatch';

type User = {
  firstName: string;
  lastName: string;
  roles: string[];
};

export const AdminGuard: GuardFunction = () => {
  const [user, err] = tryCatchSync<User>(() => (
    // TODO - create a hook
    JSON.parse(window.localStorage.getItem('user') || '')
  ));

  // Error from `JSON.parse`
  if (err) {
    return false;
  }

  // If no user found in the local storage
  if (!user) {
    return false;
  }

  // If no roles found in the user data
  if (!user.roles.length) {
    return false;
  }

  // If the user roles includes `admin` allow to access the route
  return user.roles.includes('admin');
};

import { AUTH } from './actionTypes';

export const auth = (isAuthenticated) => ({
  type: AUTH,
  isAuthenticated
});


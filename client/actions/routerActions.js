import { routerTypes } from './types';

const navigate = (location, action) => ({
  type: routerTypes.NAVIGATE,
  location,
  action,
});

export default {
  navigate,
};

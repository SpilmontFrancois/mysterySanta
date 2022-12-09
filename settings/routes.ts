import {
  faClockRotateLeft,
  faHouse,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export enum routes {
  Home = 'Home',
  History = 'History',
  Profile = 'Profile',
  Login = 'Login',
}

export const customRoutes = {
  [routes.Home]: {
    tab: true,
    icon: faHouse,
  },
  [routes.History]: {
    tab: true,
    icon: faClockRotateLeft,
  },
  [routes.Profile]: {
    tab: true,
    icon: faUser,
  },
  [routes.Login]: {
    tab: false,
    icon: undefined,
  },
};

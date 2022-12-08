export enum routes {
  HomePage = 'HomePage',
  History = 'History',
  Profile = 'Profile',
  Login = 'Login',
}

export const customRoutes = {
  [routes.HomePage]: {
    tab: true,
  },
  [routes.History]: {
    tab: true,
  },
  [routes.Profile]: {
    tab: true,
  },
  [routes.Login]: {
    tab: false,
  },
};

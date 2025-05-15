import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/dashAdmin/Page';
import Blog from '../pages/Blog';
import Detail from '../pages/Detail';
import Lokasi from '../pages/Lokasi';
import Costumer from '../pages/customer/Page';
import Pesanan from '../pages/Pesanan';
import Login from '../pages/Auth';

export const HOME_PAGE = '/';
export const CUSTOMER_PAGE = '/dash/customer';
export const ADMIN_PAGE = '/dash/admin';
export const DETAIl_PAGE = '/detail/:id';
export const BLOG_PAGE = '/blog';
export const LOKASI_PAGE = '/lokasi';
export const PESANAN_PAGE = '/pesanan';
export const LOGIN_PAGE = '/auth';

export const routes = createBrowserRouter(
  [
    {
      path: HOME_PAGE,
      Component: Home,
    },
    {
      path: ADMIN_PAGE,
      Component: Admin,
    },
    {
      path: BLOG_PAGE,
      Component: Blog,
    },
    {
      path: DETAIl_PAGE,
      Component: Detail,
    },
    {
      path: LOKASI_PAGE,
      Component: Lokasi,
    },
    {
      path: PESANAN_PAGE,
      Component: Pesanan,
    },
    {
      path: LOGIN_PAGE,
      Component: Login,
    },
    {
      path: CUSTOMER_PAGE,
      Component: Costumer,
    },
  ],
  {
    basename: '/', 
  }
);
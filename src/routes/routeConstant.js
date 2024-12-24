import { createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Blog from '../pages/Blog';

export const HOME_PAGE = '/';
export const ADMIN_PAGE = '/Admin';
export const BLOG_PAGE = '/blog';

export const routes = createHashRouter(
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
  ],
  {
    basename: '/', 
  }
);
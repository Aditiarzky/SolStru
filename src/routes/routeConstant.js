import { createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Blog from '../pages/Blog';
import Detail from '../pages/Detail';

export const HOME_PAGE = '/';
export const ADMIN_PAGE = '/admin';
export const DETAIl_PAGE = '/detail/:id';
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
    {
      path: DETAIl_PAGE,
      Component: Detail,
    },
  ],
  {
    basename: '/', 
  }
);
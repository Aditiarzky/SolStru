import { RouterProvider } from 'react-router-dom';
// import { useEffect } from 'react';
import {
  routes,
} from './routes/routeConstant';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const { preload, user } = useAuth();

  // useEffect(() => {
  //   if (!user?.name) {
  //     console.log('preload');

  //     preload();
  //   }
  // }, [preload, user]);

  return (
    <div className='scroll-smooth font-rubik w-full text-[#1f1f1f] flex justify-center min-h-screen px-2 bg-[#f1f2f1] tracking-tight'>
      <ToastContainer autoClose={2000} />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
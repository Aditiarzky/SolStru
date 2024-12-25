import { RouterProvider } from 'react-router-dom';
// import { useEffect } from 'react';
import {
  routes,
} from './routes/routeConstant';

function App() {
  // const { preload, user } = useAuth();

  // useEffect(() => {
  //   if (!user?.name) {
  //     console.log('preload');

  //     preload();
  //   }
  // }, [preload, user]);

  return (
    <div className='font-rubik w-full text-[#1f1f1f] flex justify-center min-h-screen px-2 bg-[#f1f2f1] tracking-tight'>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
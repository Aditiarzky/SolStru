import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../stores/useAuth';
import { LOGIN_PAGE } from '../../routes/routeConstant';
import { Progress } from '../../components/ui/progress'; // Sesuaikan path dengan lokasi komponen Progress

const ProtectedRoute = ({ children }) => {
  const { checkAuth, refreshToken, userAuth, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);
  const [progress, setProgress] = useState(0); // State untuk progress bar
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        setIsChecking(true);
        setProgress(10); // Mulai progress

        // Check authentication status
        let authSuccess = await checkAuth();
        setProgress(40); // Update progress setelah checkAuth

        // If not authenticated, try refreshing the token
        if (!authSuccess) {
          const { success: refreshSuccess } = await refreshToken();
          authSuccess = refreshSuccess;
          setProgress(70); // Update progress setelah refreshToken
        }

        // If still not authenticated, redirect to login
        if (!authSuccess) {
          setAuthStatus(false);
          setIsChecking(false);
          return;
        }

        // Fetch user data
        const { success: userFetched, data } = await userAuth();
        setProgress(90); // Update progress setelah userAuth

        // Redirect if user data fetch fails or data is invalid
        if (!userFetched || !data) {
          setAuthStatus(false);
          setIsChecking(false);
          return;
        }

        setAuthStatus(true);
        setProgress(100); // Selesai
      } catch (error) {
        console.error('Auth verification failed:', error);
        setAuthStatus(false);
      } finally {
        setIsChecking(false);
      }
    };

    verify();
  }, [checkAuth, refreshToken, userAuth]);

  // Add an effect to watch the isAuthenticated state from the store
  useEffect(() => {
    if (!isAuthenticated && !isChecking) {
      navigate(LOGIN_PAGE, { replace: true });
    }
  }, [isAuthenticated, isChecking, navigate]);

  // Animasi progress bar
  useEffect(() => {
    if (isChecking) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 10; // Increment progress secara bertahap
        });
      }, 300); // Update setiap 300ms untuk animasi halus
      return () => clearInterval(timer);
    }
  }, [isChecking]);

  if (isChecking) {
    return (
      <div className="w-full h-dvh inset-0 flex flex-col items-center justify-center bg-background">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-foreground">Memuat...</p>
          <div className="w-64">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!authStatus) {
    return <Navigate to={LOGIN_PAGE} replace />;
  }

  return children;
};

export default ProtectedRoute;
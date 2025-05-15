import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../stores/useAuth";

export function useRequireAuth() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    checkAuth,
    refreshToken,
    userAuth,
  } = useAuth();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      if (!isAuthenticated) {
        const { success } = await refreshToken();
        if (!success) {
          navigate("/");
          return;
        }
    }
    setReady(true);
    };
    verify();
  }, []);
  
  return { ready };
}

import { Link } from "react-router-dom";
import OrderManagement from "../../components/OrderManagement";
import ProjectManagement from "../../components/ProjectManagement";
import { HOME_PAGE } from "../../routes/routeConstant";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";
import useAuth from '../../stores/useAuth';

export default function Admin() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-7xl w-full py-3 flex flex-col gap-3 min-h-dvh">
        <header className="py-2 px-8 bg-white rounded-3xl flex items-center justify-between">
          <Link to={HOME_PAGE}><div className="logo-app md:h-11 md:w-32 h-9 w-24"></div></Link>
          <button onClick={logout}>Logout</button>
        </header>
        <main className="flex-grow">
          <OrderManagement />
          <ProjectManagement />
        </main>
      </div>
    </ProtectedRoute>
  );
}

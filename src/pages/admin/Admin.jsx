import { Link } from "react-router-dom";
import OrderManagement from "../../components/OrderManagement";
import ProjectManagement from "../../components/ProjectManagement";
import { HOME_PAGE } from "../../routes/routeConstant";

export default Admin;

function Admin(){
  return (
    <div className="max-w-7xl w-full py-3 flex flex-col gap-1 min-h-dvh">
      <header className="py-2 px-8 bg-white rounded-3xl flex items-center justify-between">
        <Link to={HOME_PAGE} ><div className="logo-app md:h-11 md:w-32 h-9 w-24" ></div></Link>
        <h1 className="md:text-2xl hidden sm:block text-lg font-semibold">Admin Dashboard</h1>
        <h1 className="md:text-2xl sm:hidden text-lg font-semibold">Admin Dash</h1>
      </header>
      <main className="flex-grow">
        <OrderManagement />
        <ProjectManagement />
      </main>
    </div>
  )
}


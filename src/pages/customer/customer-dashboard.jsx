import { useState } from "react"
import { Bell, Package, User, Menu, LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { OrderNotifications } from "./order-notifications"
import { OrderManagement } from "./order-management"
import { CustomerProfile } from "./customer-profile"
import useAuth from "../../stores/useAuth"
import useNotification from "../../stores/useNotification"
import { useNavigate } from "react-router-dom"
import { LOGIN_PAGE } from "../../routes/routeConstant"

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("notifications")
  const {dataUser, logout} = useAuth();
  const {notifications} = useNotification();
  const navigate = useNavigate();
  const countOfReaded = notifications.filter(n => !n.dibaca).length;
  if (dataUser === null) navigate(LOGIN_PAGE, { replace: true });

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b md:hidden">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span className="font-semibold">Dashboard</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <MobileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r h-screen sticky top-0">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <span className="font-semibold">Dashboard</span>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={activeTab === "notifications" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              <Badge className="ml-auto">{countOfReaded}</Badge>
            </Button>
            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant={activeTab === "profile" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 justify-between">
              <div>
                <p className="text-sm font-medium">{dataUser.name}</p>
                <p className="text-xs text-muted-foreground">{dataUser.email}</p>
              </div>
              <button className="hover:bg-gray-100 rounded p-1 text-red-500" onClick={logout}>
                <LogOut/>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-screen-2xl mx-auto">
            {/* Mobile Tabs */}
            <div className="md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="notifications">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="orders">
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Content based on active tab */}
            {activeTab === "notifications" && <OrderNotifications />}
            {activeTab === "orders" && <OrderManagement />}
            {activeTab === "profile" && <CustomerProfile />}
          </div>
        </main>
      </div>
    </div>
  )
}

function MobileSidebar({ activeTab, setActiveTab }) {
  const {dataUser, logout} = useAuth();
  const {notifications} = useNotification();
  const navigate = useNavigate();
  const countOfReaded = notifications.filter(n => !n.dibaca).length;
  if (dataUser === null) navigate(LOGIN_PAGE, { replace: true });
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span className="font-semibold">Dashboard</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={activeTab === "notifications" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
          <Badge className="ml-auto">{countOfReaded}</Badge>
        </Button>
        <Button
          variant={activeTab === "orders" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("orders")}
        >
          <Package className="mr-2 h-4 w-4" />
          Orders
        </Button>
        <Button
          variant={activeTab === "profile" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </nav>
      <div className="p-4 border-t flex justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-medium">{dataUser.name}</p>
            <p className="text-xs text-muted-foreground">{dataUser.email}</p>
          </div>
        </div>
        <button className="hover:bg-gray-100 rounded p-1 text-red-500" onClick={logout}>
          <LogOut/>
        </button>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../stores/useAuth";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ADMIN_PAGE, CUSTOMER_PAGE } from "../routes/routeConstant";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    alamat_usr: "",
    telepon: "",
  });

  const {
    login,
    register,
    loading,
    isAuthenticated,
    checkAuth,
    userAuth,
    dataUser
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (isAuthenticated) {
        await userAuth();
      }
    };
    verifyAuth();
  }, [checkAuth, isAuthenticated, userAuth]);

  useEffect(() => {
    if (dataUser && dataUser.role === "admin") {
      navigate(ADMIN_PAGE, { replace: true });
    } else if (dataUser && dataUser.role === "guest") {
      navigate(CUSTOMER_PAGE, { replace: true });
    }
  }, [dataUser, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginData);
    if (result.success & result.role === "admin") {
      navigate(ADMIN_PAGE, { replace: true });
    }
    if (result.success & result.role === "guest") {
      navigate(CUSTOMER_PAGE, { replace: true });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(registerData);
    setTab("login");
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md mx-auto">
        <Tabs defaultValue="login" value={tab} onValueChange={setTab} className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Akun</CardTitle>
              <TabsList>
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Kelola akun Anda</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Formulir Masuk */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Kata Sandi</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="sr-only">
                        {showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                      </span>
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sedang masuk..." : "Masuk"}
                </Button>
              </form>
            </TabsContent>

            {/* Formulir Daftar */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nama <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Masukkan nama lengkap"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Kata Sandi <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Buat kata sandi"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alamat">
                    Alamat <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="alamat"
                    name="alamat_usr"
                    placeholder="Masukkan alamat lengkap"
                    value={registerData.alamat_usr}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telepon">
                    Telepon <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="telepon"
                    name="telepon"
                    placeholder="Masukkan nomor telepon"
                    value={registerData.telepon}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sedang mendaftar..." : "Daftar"}
                </Button>
              </form>
            </TabsContent>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Autentikasi aman untuk akun Anda
            </p>
          </CardFooter>
        </Tabs>
      </Card>
    </main>
  );
}
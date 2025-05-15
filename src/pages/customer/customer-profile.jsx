import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import useAuth from "../../stores/useAuth";
import useUser from "../../stores/useUser";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";

export function CustomerProfile() {
  const { dataUser, userAuth } = useAuth();
  const { editUser, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userExist, setUserExist] = useState(dataUser); // Perbaikan: hapus 'let' untuk state

  // Refs untuk input
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  const handleSave = async () => {
    const editedData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      telepon: phoneRef.current?.value,
      alamat_usr: addressRef.current?.value,
    };

    const result = await editUser(editedData, dataUser.id);

    if (result.success) {
      const { data } = await userAuth();
      setUserExist(data); // Perbaikan: panggil fungsi setUserExist
      setIsEditing(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profil Pelanggan</h2>
        <p className="text-muted-foreground">Kelola informasi pribadi dan preferensi Anda.</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Informasi Pribadi</TabsTrigger>
          <TabsTrigger value="address">Alamat</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informasi Pribadi</CardTitle>
                  <CardDescription>Kelola detail pribadi Anda</CardDescription>
                </div>
                <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Batal" : "Ubah"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    ref={nameRef}
                    defaultValue={userExist?.name}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    ref={emailRef}
                    defaultValue={userExist?.email}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    ref={phoneRef}
                    defaultValue={userExist?.telepon}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter>
                <Button className="ml-auto" onClick={handleSave} disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="address" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informasi Alamat</CardTitle>
                  <CardDescription>Kelola alamat pengiriman Anda</CardDescription>
                </div>
                <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Batal" : "Ubah"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    ref={addressRef}
                    defaultValue={userExist?.alamat_usr}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter>
                <Button className="ml-auto" onClick={handleSave} disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </ProtectedRoute>
  );
}
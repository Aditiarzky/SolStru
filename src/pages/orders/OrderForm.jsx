import { useState } from "react";
import { CalendarIcon, CheckCircle2, Info } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useAuth from "../../stores/useAuth";
import useAddPesanan from "../../stores/useAddPesanan";
import { Link, useNavigate } from "react-router-dom";
import { CUSTOMER_PAGE } from "../../routes/routeConstant";

export function OrderForm() {
  const { dataUser } = useAuth();
  const { addPesanan, loading: sending, orderCreated } = useAddPesanan();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    nama_ps: dataUser.name,
    alamat_ps: dataUser.alamat_usr,
    jlayanan_ps: "",
    deskripsi_ps: "",
    ukuran_ps: "",
    tanggal_mulai: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, jlayanan_ps: value }));
    if (errors.jlayanan_ps) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.jlayanan_ps;
        return newErrors;
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, tanggal_mulai: date }));
    if (errors.tanggal_mulai) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.tanggal_mulai;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama_ps.trim()) newErrors.nama_ps = "Nama harus diisi";
    if (!formData.alamat_ps.trim()) newErrors.alamat_ps = "Alamat harus diisi";
    if (!formData.jlayanan_ps) newErrors.jlayanan_ps = "Pilih layanan";
    if (!formData.ukuran_ps || formData.ukuran_ps <= 0)
      newErrors.ukuran_ps = "Ukuran harus diisi dengan angka positif";
    if (!formData.tanggal_mulai) newErrors.tanggal_mulai = "Tanggal mulai harus diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReview = () => {
    if (validateForm()) {
      setFormStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStep === 1) {
      handleReview();
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        nama_ps: formData.nama_ps,
        alamat_ps: formData.alamat_ps,
        jlayanan_ps: formData.jlayanan_ps,
        deskripsi_ps: formData.deskripsi_ps || null,
        ukuran_ps: parseInt(formData.ukuran_ps) || null,
        tanggal_mulai: formData.tanggal_mulai ? format(formData.tanggal_mulai, "yyyy-MM-dd") : null,
        uid: dataUser?.uid,
        status_pesan: "ditunda",
      };

      await addPesanan(payload);
      setFormStep(3);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat mengirim form. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setFormStep(1);
  };

  const handleReset = () => {
    setFormData({
      nama_ps: "",
      alamat_ps: "",
      jlayanan_ps: "",
      deskripsi_ps: "",
      ukuran_ps: "",
      tanggal_mulai: undefined,
    });
    setFormStep(1);
    setErrors({});
  };

  if (formStep === 3) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-medium text-green-600">Pengajuan Berhasil</CardTitle>
          <CardDescription>Terima kasih atas pengajuan Anda</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <p className="text-center">
            Pengajuan Anda telah kami terima. Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk konfirmasi dan
            diskusi lebih lanjut.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg w-full mt-4">
            <h3 className="font-medium mb-2">Detail Pengajuan:</h3>
            <p>
              <span className="font-medium">PSID:</span> {orderCreated?.psid || "N/A"}
            </p>
            <p>
              <span className="font-medium">Nama:</span> {orderCreated?.nama_ps || "N/A"}
            </p>
            <p>
              <span className="font-medium">Layanan:</span>{" "}
              {orderCreated?.jlayanan_ps === "konstruksi"
                ? "Konstruksi"
                : orderCreated?.jlayanan_ps === "arsitektur"
                ? "Arsitektur"
                : "N/A"}
            </p>
            <p>
              <span className="font-medium">Ukuran:</span>{" "}
              {orderCreated?.ukuran_ps ? `${orderCreated.ukuran_ps} m²` : "N/A"}
            </p>
            <p>
              <span className="font-medium">Tanggal Mulai:</span>{" "}
              {orderCreated?.tanggal_mulai
                ? format(new Date(orderCreated.tanggal_mulai), "PPP", { locale: id })
                : "N/A"}
            </p>
            {orderCreated?.deskripsi_ps && (
              <p>
                <span className="font-medium">Deskripsi:</span> {orderCreated.deskripsi_ps}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button onClick={handleReset} className="w-full">
            Buat Pengajuan Baru
          </Button>
          <Link to={CUSTOMER_PAGE} className="w-full">
          <Button variant='outline' className="w-full">
            Ke Dashboard
          </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">
          {formStep === 1 ? "Form Pengajuan" : "Konfirmasi Pengajuan"}
        </CardTitle>
        <CardDescription>
          {formStep === 1
            ? "Silakan isi form berikut untuk mengajukan layanan"
            : "Periksa kembali data pengajuan Anda sebelum mengirim"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formStep === 1 ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nama_ps" className={cn(errors.nama_ps && "text-destructive")}>
                    Nama <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nama_ps"
                    name="nama_ps"
                    value={formData.nama_ps}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama anda"
                    className={cn(errors.nama_ps && "border-destructive")}
                  />
                  {errors.nama_ps && <p className="text-sm text-destructive mt-1">{errors.nama_ps}</p>}
                </div>

                <div>
                  <Label htmlFor="alamat_ps" className={cn(errors.alamat_ps && "text-destructive")}>
                    Alamat <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="alamat_ps"
                    name="alamat_ps"
                    value={formData.alamat_ps}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat anda"
                    className={cn(errors.alamat_ps && "border-destructive")}
                  />
                  {errors.alamat_ps && <p className="text-sm text-destructive mt-1">{errors.alamat_ps}</p>}
                </div>

                <div>
                  <Label htmlFor="jlayanan_ps" className={cn(errors.jlayanan_ps && "text-destructive")}>
                    Layanan <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.jlayanan_ps} onValueChange={handleSelectChange}>
                    <SelectTrigger id="jlayanan_ps" className={cn(errors.jlayanan_ps && "border-destructive")}>
                      <SelectValue placeholder="Pilih layanan yang anda inginkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="konstruksi">Konstruksi</SelectItem>
                      <SelectItem value="arsitektur">Arsitektur</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jlayanan_ps && <p className="text-sm text-destructive mt-1">{errors.jlayanan_ps}</p>}
                </div>

                <div>
                  <Label htmlFor="deskripsi_ps">Deskripsi</Label>
                  <Textarea
                    id="deskripsi_ps"
                    name="deskripsi_ps"
                    value={formData.deskripsi_ps}
                    onChange={handleInputChange}
                    placeholder="Tulis deskripsi proyek anda"
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="ukuran_ps" className={cn(errors.ukuran_ps && "text-destructive")}>
                    Ukuran (m²) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ukuran_ps"
                    name="ukuran_ps"
                    type="number"
                    value={formData.ukuran_ps}
                    onChange={handleInputChange}
                    placeholder="Contoh: 120"
                    className={cn(errors.ukuran_ps && "border-destructive")}
                  />
                  {errors.ukuran_ps && <p className="text-sm text-destructive mt-1">{errors.ukuran_ps}</p>}
                </div>

                <div>
                  <Label htmlFor="tanggal_mulai" className={cn(errors.tanggal_mulai && "text-destructive")}>
                    Tanggal Mulai <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="tanggal_mulai"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.tanggal_mulai && "text-muted-foreground",
                          errors.tanggal_mulai && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.tanggal_mulai ? (
                          format(formData.tanggal_mulai, "PPP", { locale: id })
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.tanggal_mulai}
                        onSelect={handleDateChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.tanggal_mulai && <p className="text-sm text-destructive mt-1">{errors.tanggal_mulai}</p>}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-medium mb-4">Detail Pengajuan:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-medium">{formData.nama_ps}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alamat</p>
                    <p className="font-medium">{formData.alamat_ps}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Layanan</p>
                    <p className="font-medium">{formData.jlayanan_ps === "konstruksi" ? "Konstruksi" : "Arsitektur"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ukuran</p>
                    <p className="font-medium">{formData.ukuran_ps} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tanggal Mulai</p>
                    <p className="font-medium">
                      {formData.tanggal_mulai && format(formData.tanggal_mulai, "PPP", { locale: id })}
                    </p>
                  </div>
                </div>
                {formData.deskripsi_ps && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Deskripsi</p>
                    <p className="font-medium">{formData.deskripsi_ps}</p>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Informasi Penting</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Dengan mengirimkan form ini, Anda setuju bahwa tim kami akan menghubungi Anda untuk konfirmasi dan
                      diskusi lebih lanjut.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {formStep === 2 && (
              <Button type="button" variant="outline" onClick={handleEdit} className="sm:flex-1">
                Kembali & Edit
              </Button>
            )}
              {formStep === 1 && (
                <Button type="button" variant="outline" onClick={handleBack} className="sm:flex-1">
                  Kembali
                </Button>
              )}
            <Button
              type="submit"
              className={cn("sm:flex-1", formStep === 1 ? "w-full" : "")}
              disabled={isSubmitting || sending}
              >
              {isSubmitting || sending ? "Memproses..." : formStep === 1 ? "Lanjut ke Konfirmasi" : "Kirim Pengajuan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
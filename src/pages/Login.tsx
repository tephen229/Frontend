import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputText from "../components/ui/Input";
import Button from "../components/ui/Button";
import InputPassword from "../components/ui/InputPassword";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(8, "Minimal 8 Karakter"),
});

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (data.username === "dwiriski" && data.password === "24090028") {
      alert("Login Berhasil");
      login(data.username);
      navigate("/dashboard");
    } else {
      alert("Login Gagal: Username atau Password salah");
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center p-4 bg-gray-50/50">
      {/* Container Utama Split Screen */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[550px]">
        
        {/* 🌟 SISI KIRI: 50% GAMBAR & VISUAL INVOFEST (Sembunyi di HP, muncul di MD ke atas) */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-red-950 via-red-900 to-amber-950 text-white relative overflow-hidden">
          {/* Aksen Dekorasi Cahaya Pudar di Background */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>

          {/* Logo Atas */}
          <div className="relative z-10">
            <img 
              src="https://www.invofest-harkatnegeri.com/assets/text-image.png" 
              alt="INVOFEST Logo" 
              className="h-10 w-auto object-contain brightness-0 invert" // Mengubah logo teks menjadi putih bersih
            />
          </div>

          {/* Maskot Tengah */}
          <div className="flex justify-center items-center my-auto relative z-10">
            <img 
              src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png" 
              alt="Maskot" 
              className="w-64 h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] animate-bounce-slow"
            />
          </div>

          {/* Teks Footer Kecil */}
          <div className="relative z-10 text-left">
            <p className="text-sm font-medium text-red-200 tracking-wide">
              Informatics Vocational Festival 2025
            </p>
            <p className="text-xs text-red-300/70 mt-1">
              "Beyond Limits, Beyond Intelligence"
            </p>
          </div>
        </div>

        {/* 📝 SISI KANAN: 50% FORM LOGIN (Lebar penuh di HP, setengah di laptop) */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          
          {/* Header internal form */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Silakan login untuk mengakses akun peserta Anda.
            </p>
          </div>

          {/* Form Utama */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputText
              label="Username"
              name="username"
              register={register}
              error={errors.username?.message}
            />

            <InputPassword
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

            <div className="pt-2">
              <Button 
                label="Masuk Sekarang" 
                variant="primary" 
                className="w-full py-3 font-semibold shadow-md shadow-red-900/10 hover:shadow-lg transition-all" 
              />
            </div>

            {/* Link Register / Daftar */}
            <div className="text-center md:text-left text-sm text-gray-600 pt-4 border-t border-gray-100 mt-6 flex flex-col sm:flex-row justify-between gap-2">
              <span>Belum punya akun?</span>
              <Link 
                to="/register" 
                className="font-bold text-red-800 hover:text-red-900 transition-colors"
              >
                Daftar Sekarang &rarr;
              </Link>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react"; // Tambahan untuk mengelola state loading/error jika diperlukan

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(1, "Username Harus Diisi!"),
  password: z.string().min(1, "Password Harus Diisi!"),
});

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false); // State untuk efek loading saat menembak API

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Fungsi onSubmit yang sudah terintegrasi dengan database melalui API backend
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Login Berhasil!");
        
        // Sesuaikan argumen di bawah dengan struktur store Zustand milikmu.
        // Umumnya menyimpan token dan data user yang dikirim dari backend:
        login(result.data.user.username);
        
        navigate("/dashboard");
      } else {
        // Menampilkan pesan error spesifik dari backend (misal: "Username atau password salah")
        alert(`Login Gagal: ${result.message}`);
      }
    } catch (error) {
      console.error("Error login:", error);
      alert("Terjadi kesalahan! Gagal terhubung ke server backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center p-4 bg-gray-50/50">
      {/* Container Utama Split Screen */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[550px]">
        
        {/* 🌟 SISI KIRI: 50% GAMBAR & VISUAL INVOFEST */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-red-950 via-red-900 to-amber-950 text-white relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>

          {/* Logo Atas */}
          <div className="relative z-10">
            <img 
              src="https://www.invofest-harkatnegeri.com/assets/text-image.png" 
              alt="INVOFEST Logo" 
              className="h-10 w-auto object-contain brightness-0 invert"
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

        {/* 📝 SISI KANAN: 50% FORM LOGIN */}
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
  <button 
    type="submit"
    disabled={loading} // Sekarang dijamin tidak akan error karena ini tag bawaan HTML
    className={`w-full py-3 font-semibold text-white bg-red-800 rounded-xl shadow-md shadow-red-900/10 hover:shadow-lg hover:bg-red-900 transition-all ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {loading ? "Menghubungkan..." : "Masuk Sekarang"}
  </button>
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
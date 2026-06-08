import { useForm } from "react-hook-form";
import InputText from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
  foto: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Gagal mendaftar");
        return;
      }

      reset();
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Tidak bisa terhubung ke server. Pastikan BE sudah berjalan!");
    }
  };

  return (
    <div className="p-8 rounded-2xl shadow-sm">
      <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>

      {success && (
        <div className="mb-4 px-4 py-3 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm font-medium">
          Registrasi berhasil! Mengarahkan ke halaman login...
        </div>
      )}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <InputText
          label="Foto (nama file)"
          name="foto"
          register={register}
          error={errors.foto?.message}
        />

        <div className="flex justify-center">
          <Button label="Daftar" variant="primary" className="rounded-3xl" />
        </div>

        <p className="mt-4 text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login sekarang
          </a>
        </p>
      </form>
    </div>
  );
}
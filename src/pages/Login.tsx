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
  password: z.string().min(5, "Minimal 8 Karakter"),
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
    if (
      data.username === "adi" &&
      data.password === "adi123"
    ) {
      alert("Login Berhasil");
      login(data.username);
      navigate("/dashboard");
    } else {
      alert("Login Gagal: Username atau Password salah");
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

        <div>
          <Button label="Login" variant="primary" />
        </div>

        <div>
          Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
        </div>
      </form>
    </div>
  );
}
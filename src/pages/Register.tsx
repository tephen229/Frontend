import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputText from "../components/ui/Input";
import Button from "../components/ui/Button";
import InputPassword from "../components/ui/InputPassword";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const schema = z.object({
  name: z.string().min(1, "Username harus diisi"),
  email: z.string().min(1, "Username harus diisi"),
  password: z.string().min(8, "Minimal 8 Karakter"),
  password_confirm: z.string().min(8, "Minimal 8 Karakter"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputText
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />
        <InputText
          label="Email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <InputPassword
          label="Password"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        <InputPassword
          label="Password Confirm"
          name="password_confirm"
          register={register}
          error={errors.password_confirm?.message}
        />

        <div>
          <Button label="Register" variant="primary" />
        </div>

        <div>
          Sudah punya akun? <Link to="/login">Login Sekarang</Link>
        </div>
      </form>
    </div>
  );
}
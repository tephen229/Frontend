import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    foto: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((resJson) => {
        // Ambil data dari properti .data jika dibungkus oleh backend, jika tidak langsung resJson
        const userData = resJson.data || resJson;
        
        setForm({
          username: userData.username || "",
          password: "", // Tetap kosongkan agar tidak menampilkan hash password asli
          foto: userData.foto || "",
        });
      })
      .catch((err) => console.error("Gagal memuat detail user:", err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi opsional: Jika password diisi, pastikan minimal 8 karakter sebelum dikirim
    if (form.password && form.password.length < 8) {
      alert("Password baru minimal harus 8 karakter!");
      return;
    }

    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("User berhasil diupdate");
      navigate("/dashboard/user");
    } else {
      alert("Gagal update user");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-6 text-[#7B1D3F]">
        Edit User
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#7B1D3F]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Password Baru <span className="text-xs text-gray-400 font-normal">(Biarkan kosong jika tidak diganti)</span>
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#7B1D3F]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Foto (URL)
          </label>
          <input
            type="text"
            placeholder="Enter photo URL"
            value={form.foto}
            onChange={(e) =>
              setForm({ ...form, foto: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#7B1D3F]"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/user")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white px-5 py-2 rounded-lg transition-colors"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}
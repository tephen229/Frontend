import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = {
  id: number;
  username: string;
  foto: string;
  created_at: string;
};

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/users");
        
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const resJson = await response.json();
        
        // VALIDASI: Cek apakah resJson berbentuk array langsung atau dibungkus dalam properti .data
        const dataArray = Array.isArray(resJson) ? resJson : resJson.data || [];
        setUsers(dataArray);
      } catch (error) {
        console.error("Error loadUsers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus user ini?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("Gagal menghapus user dari server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-7 py-8 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
            <span className="text-[10px] font-semibold text-[#7B1D3F] tracking-widest uppercase">
              Manajemen
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#1a0a10]">
            User
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Data user yang tersimpan di database
          </p>
        </div>

        <Link
          to="/dashboard/user/create"
          className="flex items-center gap-1.5 bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <span className="text-base leading-none">+</span>
          Tambah User
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase">
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Memuat data user...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Belum ada data user yang tersimpan atau gagal memuat data.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-rose-50/40 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-400">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3">
                    <img
                      src={user.foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover border bg-gray-50"
                      onError={(e) => {
                        // Jika URL foto dari database bermasalah/kosong, pakai avatar default unspash ini
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80";
                      }}
                    />
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {user.username}
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {new Date(user.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/user/edit/${user.id}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-400">
            Menampilkan {users.length} user
          </span>
        </div>
      </div>
    </div>
  );
}
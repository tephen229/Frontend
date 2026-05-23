import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// ===== SERVICE =====
const BASE_URL = "https://backend-pied-nine-13.vercel.app/events";
const CATEGORY_URL = "https://backend-pied-nine-13.vercel.app/categories";
const PEMBICARA_URL = "https://backend-pied-nine-13.vercel.app/speakers"; 

type Category = { id: number; name: string };
type Pembicara = { id: number; name: string }; 

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(CATEGORY_URL);
  if (!res.ok) throw new Error("Gagal ambil kategori");
  const json = await res.json();
  return Array.isArray(json) ? json : json.data || [];
};

const getPembicara = async (): Promise<Pembicara[]> => {
  const res = await fetch(PEMBICARA_URL);
  if (!res.ok) throw new Error("Gagal ambil data speakers");
  const result = await res.json();
  return Array.isArray(result) ? result : result.data || [];
};

// ===== SCHEMA =====
const schema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  pembicaraId: z.string().min(1, "Pembicara wajib dipilih"), 
  date: z.string().min(1, "Tanggal wajib diisi"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;

// ===== COMPONENT =====
export default function EventCreate() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [speakers, setSpeakers] = useState<Pembicara[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [catData, speakerData] = await Promise.all([getCategories(), getPembicara()]);
        
        console.log("Data Kategori:", catData);   
        console.log("Data Pembicara:", speakerData); 
        
        setCategories(catData);
        setSpeakers(speakerData);
      } catch (error) {
        console.error("Gagal memuat komponen data select dropdown:", error);
      } finally {
        setLoading(false);
      }
    }; // ← DI SINI: Sekarang fungsi loadData ditutup dengan benar

    loadData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          dateEvent: data.date,
          location: data.location,
          categoryId: Number(data.categoryId),
          pembicaraId: Number(data.pembicaraId), 
          description: data.description,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data ke server");
      
      alert("Event berhasil dibuat!");
      navigate("/dashboard/event");
      
    } catch (error) {
      console.error(error);
      alert("Gagal membuat event. Cek koneksi ke server.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Memuat data dropdown...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-[#7B1D3F]">Tambah Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Input Nama Event */}
        <input {...register("name")} placeholder="Nama Event" className="border p-3 rounded-lg" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        {/* Dropdown Kategori */}
        <select {...register("categoryId")} className="border p-3 rounded-lg bg-white">
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}

        {/* Dropdown Pembicara */}
        <select {...register("pembicaraId")} className="border p-3 rounded-lg bg-white">
          <option value="">Pilih Pembicara</option>
          {speakers.map((spk) => (
            <option key={spk.id} value={spk.id}>{spk.name}</option>
          ))}
        </select>
        {errors.pembicaraId && <p className="text-red-500 text-sm">{errors.pembicaraId.message}</p>}

        {/* Input Tanggal */}
        <input type="date" {...register("date")} className="border p-3 rounded-lg" />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

        {/* Input Lokasi */}
        <input {...register("location")} placeholder="Lokasi Event" className="border p-3 rounded-lg" />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

        {/* Input Deskripsi */}
        <textarea {...register("description")} placeholder="Deskripsi Event" className="border p-3 rounded-lg" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Event"}
        </button>
      </form>
    </div>
  );
}
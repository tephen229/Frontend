import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout); 
  const navigate = useNavigate(); 
  const location = useLocation(); // 🔥 Ditambahkan untuk mendeteksi posisi halaman aktif

  const handleLogout = () => {
    logout(); 
    navigate("/login", { replace: true }); 
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Categori Event", path: "/dashboard/kategori" },
    { name: "Event", path: "/dashboard/event" },
    { name: "Pembicara", path: "/dashboard/pembicara" },
    { name: "User", path: "/dashboard/user" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">

      {/* 🚀 SIDEBAR PREMIUM DEVELOPMENT */}
      <aside className="w-64 bg-gradient-to-b from-red-950 via-red-900 to-amber-950 text-white flex flex-col justify-between shadow-xl z-20">
        
        <div>
          {/* Header Sidebar Brand */}
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-black tracking-wider flex items-center gap-2">
              INVO<span className="text-amber-400">FEST</span>
            </h2>
            <p className="text-[10px] text-red-200/60 uppercase tracking-widest mt-0.5 font-medium">
              Organizer Panel
            </p>
          </div>

          {/* Menu Navigasi Interaktif */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"} // Mencegah bentrokan status aktif rute induk
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 group ${
                    isActive
                      ? "bg-white/10 text-amber-400 shadow-inner border border-white/5"
                      : "text-red-100/80 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Indikator Titik Aktif Khas Desain Premium */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${
                        isActive 
                          ? "bg-amber-400 scale-100" 
                          : "bg-transparent scale-0 group-hover:scale-100 group-hover:bg-red-300/50"
                      }`}
                    ></span>
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* 🔴 TOMBOL LOGOUT SELESAI MODIFIKASI */}
        <div className="p-4 border-t border-white/10 bg-black/15">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 text-red-200 hover:text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-sm"
          >
            {/* Ikon Pintu Keluar */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Keluar Panel
          </button>
        </div>
      </aside>

      {/* 💻 AREA KONTEN UTAMA */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        
        {/* 👑 TOPBAR MODIFIKASI PREMIUM (Bukan AI Slogan) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sm:px-8 shadow-sm">
          
          {/* SISI KIRI: Breadcrumbs Navigasi Manusiawi */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-wide">
            <span className="text-gray-400">Panel</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-red-900 capitalize">
              {location.pathname.split("/").pop() === "dashboard" ? "Overview" : location.pathname.split("/").pop()?.replace("-", " ")}
            </span>
          </div>

          {/* SISI KANAN: Manajemen Sistem & Profil Pengguna */}
          <div className="flex items-center gap-4 ml-auto">
            
            {/* Indikator Real-time Server */}
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-150">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Server Aktif
            </div>

            {/* Tombol Aksi Notifikasi Ring */}
            <button className="p-1.5 text-gray-450 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors relative">
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            {/* Pembatas Garis Tipis */}
            <div className="w-px h-5 bg-gray-200"></div>

            {/* Komponen Profil User Akun */}
            <div className="flex items-center gap-2.5 pl-1">
              {/* Avatar Squircle/Smooth Box */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-800 to-amber-900 text-amber-300 font-black flex items-center justify-center text-xs shadow-sm uppercase">
                KI
              </div>
              
              {/* Informasi Teks Profil */}
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-gray-800 leading-tight">
                  Dwi Riski Ariyanto
                </p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                  Invofest Team
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Isi Konten Halaman Terkait */}
        <div className="p-6 sm:p-8 flex-1">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
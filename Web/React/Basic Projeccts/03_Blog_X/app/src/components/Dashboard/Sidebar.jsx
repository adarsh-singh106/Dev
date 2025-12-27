import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";

const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${
        isActive
          ? "bg-linear-to-r from-[#3BB19B]/20 to-transparent text-white shadow-[0_0_20px_rgba(59,177,155,0.15)]"
          : "text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
      }`
    }
  >
    {({ isActive }) => (
      <>
        {/* Active Indicator Line */}
        <span
          className={`absolute left-0 h-full w-1 rounded-r-full bg-[#3BB19B] transition-all duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Icon with subtle glow when active */}
        <span className={`text-xl z-10 ${isActive ? "drop-shadow-[0_0_8px_rgba(59,177,155,0.5)]" : ""}`}>
          {icon}
        </span>
        
        <span className="font-medium text-sm tracking-wide z-10">{label}</span>
      </>
    )}
  </NavLink>
);

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside
      // POSITIONING:
      // left-[30px] -> Pushes it from the wall
      // top-24 -> Pushes it below the Navbar (giving it breathing room)
      // h-[calc(100vh-7rem)] -> Calculates height to float above bottom edge
      className="fixed left-10 top-24 w-64 h-[calc(100vh-7rem)] z-40 flex flex-col
                 bg-black/80 backdrop-blur-xl
                 border border-white/10 shadow-2xl shadow-black/50
                 rounded-3xl overflow-hidden"
    >
      {/* Optional: Subtle top gradient for 'lighting' effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto space-y-1">
        <div className="px-4 mb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          Menu
        </div>
        <SidebarItem to="/app/feed" icon="🚀" label="Explore" />
        <SidebarItem to="/app/create" icon="✍️" label="Create Blog" />
        <SidebarItem to="/app/bookmarks" icon="🔖" label="Bookmarks" />
        <SidebarItem to="/app/profile" icon="👤" label="My Profile" />
        <SidebarItem to="/app/settings" icon="⚙️" label="Settings" />
      </nav>

      {/* Logout Area */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 w-full rounded-xl transition-all duration-200 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">🚪</span>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
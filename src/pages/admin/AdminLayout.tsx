import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Calendar, Users, Car, Wrench, Image, Star, Settings, Menu, X, LogOut
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: <LayoutDashboard size={18} />, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: <Calendar size={18} /> },
  { to: "/admin/customers", label: "Customers", icon: <Users size={18} /> },
  { to: "/admin/services", label: "Services", icon: <Wrench size={18} /> },
  { to: "/admin/gallery", label: "Gallery", icon: <Image size={18} /> },
  { to: "/admin/reviews", label: "Reviews", icon: <Star size={18} /> },
  { to: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const Sidebar = ({ mobile = false }) => (
    <div
      className="flex flex-col h-full"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Logo */}
      <div
        className="px-5 py-5 border-b flex items-center justify-between"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
            style={{ background: "var(--accent)" }}
          >
            D
          </div>
          <div className="leading-none">
            <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>DIYA CAR CARE</div>
            <div className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Admin</div>
          </div>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} style={{ color: "var(--text-muted)" }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive ? "text-white" : ""
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "var(--accent)" : "transparent",
              color: isActive ? "white" : "var(--text-secondary)",
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t flex flex-col gap-2" style={{ borderColor: "var(--border-subtle)" }}>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ color: "var(--text-secondary)" }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ color: "var(--text-secondary)" }}
        >
          <LogOut size={18} />
          View Site
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Desktop sidebar */}
      <div
        className="hidden md:flex flex-col w-60 border-r flex-shrink-0"
        style={{ borderColor: "var(--border-subtle)", position: "sticky", top: 0, height: "100vh" }}
      >
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-60 border-r"
              style={{ borderColor: "var(--border-subtle)" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <Sidebar mobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className="md:hidden flex items-center justify-between px-4 py-3 border-b"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-subtle)",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <button onClick={() => setSidebarOpen(true)} style={{ color: "var(--text-primary)" }}>
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Admin Dashboard</span>
          <button onClick={toggleTheme} style={{ color: "var(--text-muted)" }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

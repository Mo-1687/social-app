import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Aside() {
  const { userData, setUserData } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: IoMdHome, label: "Home", path: "/home" },
    { icon: FaUser, label: "Profile", path: `/profile` },
  ];

  function logOut() {
    localStorage.removeItem("token");
    setUserData(null);
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-elegant bg-sidebar text-sidebar-foreground border border-sidebar-border hover:bg-sidebar-accent transition-colors duration-200"
      >
        {isMobileMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 flex flex-col justify-between bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-300 z-50
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-primary shadow-elegant" />
            <span className="text-lg font-extrabold gradient-text">
              SocialHub
            </span>
          </div>

          {/* Nav */}
          <nav className="space-y-2 flex-1">
            {navItems.map(({ icon: Icon, label, path }) => (
              <NavLink
                key={path}
                to={path === "/home" ? "/" : path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                  ${
                    isActive
                      ? "gradient-primary text-primary-foreground shadow-elegant"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-4 border-t border-sidebar-border">
          {/* Theme Toggle */}
          <div className="flex justify-center">
            <ThemeToggle />
          </div>

          {/* User Profile */}
          <Link
            to="/profile"
            className="card-enhanced flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200"
          >
            <img
              src={userData?.photo || "https://i.pravatar.cc/50"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border border-sidebar-border"
            />
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">
                {userData?.name || "johndoe"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userData?.email || "john@example.com"}
              </p>
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={logOut}
            className="flex shadow-sm items-center   gap-3 w-full p-3 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/15 transition-colors duration-200"
          >
            <TbLogout size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Aside;
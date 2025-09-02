import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Avatar from "../Avatar/Avatar";
function Aside() {
  const { userData, setUserData } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: IoMdHome, label: "Home", path: "/home" },
    { icon: FaUser, label: "Profile", path: `/profile` },
  ];

  function logOut() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/auth/signup");
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="xl:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-elegant bg-sidebar text-sidebar-foreground border border-sidebar-border hover:bg-sidebar-accent transition-all duration-300 glass-effect"
      >
        {isMobileMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40 xl:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={` fixed top-0 left-0 bottom-0 h-screen w-64 flex flex-col justify-between bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-300 z-50 glass-effect
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full xl:translate-x-0"
          }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-9 h-9 rounded-xl gradient-primary shadow-elegant animate-pulse-glow" />
            <span className="text-lg font-extrabold gradient-text">
              SocialHub
            </span>
          </div>

          {/* Nav */}
          <nav className="space-y-4 flex-1">
            {navItems.map(({ icon: Icon, label, path }) => (
              <NavLink
                key={path}
                to={path === "/home" ? "/" : path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium interactive-hover
                  ${
                    isActive
                      ? "gradient-primary text-primary-foreground shadow-elegant"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md"
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
        <div className="p-3 space-y-4 border-t border-sidebar-border">
          {/* Theme Toggle */}

          <ThemeToggle />

          {/* User Profile */}
          <div className="card-enhanced glass-effect flex items-center group  gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-all duration-300 interactive-hover">
            <div className="w-11 h-11 flex-shrink-0">
              <Avatar photo={userData?.photo} name={userData?.name} />
            </div>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">
                {userData?.name || "Mark"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userData?.email || "john@example.com"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logOut}
            className="flex shadow-sm glass-effect cursor-pointer items-center gap-3 w-full p-3 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/15 transition-all duration-300 interactive-hover"
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

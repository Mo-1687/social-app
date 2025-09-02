import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Header() {
  return (
    <div className="flex items-center justify-between p-3 card-enhanced glass-effect">
      {/* Logo */}
      <div className="flex items-center space-x-3 ">
        <div className="w-15 h-15 rounded-xl gradient-primary shadow-elegant animate-pulse-glow" />
        <span className="text-2xl font-extrabold gradient-text">SocialHub</span>
      </div>
      <ThemeToggle isAuth={true} />
    </div>
  );
}

export default Header;

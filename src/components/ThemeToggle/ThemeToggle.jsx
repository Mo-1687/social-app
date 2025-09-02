import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { FaMoon, FaSun } from "react-icons/fa6";

function ThemeToggle({ isAuth }) {
  const { theme, setTheme, handleThemeChange } = useContext(UserContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
    }
  }, [theme, setTheme]);

  return (
    <div
      className={`flex-all ${isAuth ? "w-fit" : "w-full"} cursor-pointer   shadow-sm space-x-3 p-2 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 glass-effect interactive-hover`}
      onClick={handleThemeChange}
    >
      {/* Sun Icon */}
      <FaSun
        className={`w-4 h-4  transition-all duration-300 ${
          theme === "light"
            ? "text-yellow-300 scale-110"
            : "text-muted-foreground/60"
        }`}
      />

      {/* Toggle Switch */}
      <div className="relative">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={handleThemeChange}
          className="hidden"
          id="theme-toggle"
        />
        <label
          htmlFor="theme-toggle"
          className={`relative inline-block w-12 h-4 rounded-full cursor-pointer transition-all duration-300 shadow-md ${
            theme === "dark" ? "bg-gradient-primary" : "bg-muted"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className={`absolute -top-0.5 -left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
              theme === "dark" ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </label>
      </div>

      {/* Moon Icon */}
      <FaMoon
        className={`w-4 h-4 transition-all duration-300 ${
          theme === "dark"
            ? "text-foreground scale-110"
            : "text-muted-foreground/60"
        }`}
      />
    </div>
  );
}

export default ThemeToggle;

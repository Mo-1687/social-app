import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { FaMoon, FaSun } from "react-icons/fa6";

function ThemeToggle() {
  const { theme, setTheme } = useContext(UserContext);

  return (
    <div className="flex items-center w-full justify-center shadow-sm space-x-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
      {/* Sun Icon */}
      <FaSun
        className={`w-4 h-4 transition-all duration-300 ${
          theme === "light" ? "text-foreground" : "text-muted-foreground/60"
        }`}
      />

      {/* Toggle Switch */}
      <div className="relative">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          className="sr-only"
          id="theme-toggle"
        />
        <label
          htmlFor="theme-toggle"
          className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ${
            theme === "dark" ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </label>
      </div>

      {/* Moon Icon */}
      <FaMoon
        className={`w-4 h-4 transition-all duration-300 ${
          theme === "dark" ? "text-foreground" : "text-muted-foreground/60"
        }`}
      />
    </div>
  );
}

export default ThemeToggle;

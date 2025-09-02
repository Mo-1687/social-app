import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function NotFound() {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10 animate-fade-in">
        <div className="card-enhanced glass-effect p-12 rounded-2xl shadow-elegant max-w-4xl mx-auto">
          {/* 404 Icon */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-destructive flex items-center justify-center shadow-elegant animate-pulse-glow">
            <span className="text-4xl">🚫</span>
          </div>

          <h1 className="text-6xl font-bold text-foreground mb-4 gradient-text">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block w-full gradient-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 btn-glow interactive-hover"
            >
              🏠 Return to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-block w-full bg-muted cursor-pointer text-muted-foreground py-3 px-6 rounded-xl font-medium hover:bg-muted/80 transition-all duration-300 interactive-hover"
            >
              ← Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NotFound;

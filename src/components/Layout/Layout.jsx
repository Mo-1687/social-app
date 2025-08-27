import { Outlet } from "react-router-dom";
import Aside from "../Aside/Aside";

function Layout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <div className="flex-1 bg-muted/30 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

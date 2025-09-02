import { Outlet } from "react-router-dom";
import Aside from "../../../components/Aside/Aside";

function Layout() {
  return (
    <div className=" flex min-h-screen bg-gradient-subtle text-foreground">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <div
        className=" flex-1 sm:px-8 py-8 overflow-hidden bg-muted/30 backdrop-blur-sm relative
          xl:ml-64"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-responsive  max-w-4xl mx-auto  py-4 sm:px-6 sm:py-6 lg:px-6  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

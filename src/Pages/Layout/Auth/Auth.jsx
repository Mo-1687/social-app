import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";

function Auth() {
  return (
    <>
      <Header />
      <div className="min-h-screen mt-4 flex items-center justify-center bg-gradient-subtle px-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-primary/5"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-accent/10 rounded-full blur-3xl"></div>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default Auth;

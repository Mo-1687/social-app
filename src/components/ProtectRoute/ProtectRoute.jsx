import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {

  if (!localStorage.getItem("token")) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

export default ProtectRoute;

import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectRoute;

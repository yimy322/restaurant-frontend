import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/api";
// protege las rutas de administracion, redirigiendo al login si no hay token en localStorage
function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default RequireAuth;
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAtom } from "jotai";

import { secretAtom } from "atoms/authenticateAtom";

function PrivateRoute() {
  const [secret] = useAtom(secretAtom);
  const location = useLocation();

  return (secret) ? (
    <Outlet />
  ) : (
    <Navigate to={"/sign-in"} state={{ from: location }} replace />
  );
}

export default PrivateRoute;

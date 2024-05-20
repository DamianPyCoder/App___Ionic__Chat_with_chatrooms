import { AuthRoutes } from "./AuthRoutes";
import { useAuth } from "../hooks";
import { Login } from "../pages";

export function HandlerRoutes() {
  const { username } = useAuth();

  if (!username) return <Login />;

  return <AuthRoutes />;
}

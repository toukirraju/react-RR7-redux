import type { Route } from "./+types/_public.login";
import { Navigate } from "react-router";
import { PublicLayout } from "~/components/layouts/PublicLayout";
import { LoginPage } from "~/pages/auth/LoginPage";
import { useAppSelector } from "~/lib/redux/hooks";
import { selectIsAuthenticated } from "~/features/auth/authSelectors";

export function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <PublicLayout>{children}</PublicLayout>;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login page" },
  ];
}

export default function Login() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <LoginPage />;
}


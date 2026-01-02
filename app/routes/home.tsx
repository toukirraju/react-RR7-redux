import type { Route } from "./+types/home";
import { Navigate } from "react-router";
import { useAppSelector } from "~/lib/redux/hooks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Home page" },
  ];
}

export default function Home() {
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
}

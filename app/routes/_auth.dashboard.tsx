import type { Route } from "./+types/_auth.dashboard";
import { DashboardPage } from "~/pages/dashboard/DashboardPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "User dashboard" },
  ];
}

export default function Dashboard() {
  return <DashboardPage />;
}


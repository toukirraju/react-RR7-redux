import type { Route } from "./+types/_auth.analytics";
import { AnalyticsPage } from "~/pages/analytics/AnalyticsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics" },
    { name: "description", content: "Analytics dashboard" },
  ];
}

export default function Analytics() {
  return <AnalyticsPage />;
}


import type { Route } from "./+types/_auth.settings";
import { SettingsPage } from "~/pages/settings/SettingsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "User settings page" },
  ];
}

export default function Settings() {
  return <SettingsPage />;
}


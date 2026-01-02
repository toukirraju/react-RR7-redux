import type { Route } from "./+types/_auth.profile";
import { ProfilePage } from "~/pages/profile/ProfilePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile" },
    { name: "description", content: "User profile page" },
  ];
}

export default function Profile() {
  return <ProfilePage />;
}


import type { Route } from "./+types/home";
import { HomePage } from "~/pages/home/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Home page" },
  ];
}

export default function Home() {
  return <HomePage />;
}

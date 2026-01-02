import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/_auth.tsx", [
    route("dashboard", "routes/_auth.dashboard.tsx"),
    route("products", "routes/_auth.products._index.tsx"),
    route("products/:id", "routes/_auth.products.$id.tsx"),
    route("profile", "routes/_auth.profile.tsx"),
    route("analytics", "routes/_auth.analytics.tsx"),
    route("settings", "routes/_auth.settings.tsx"),
  ]),
  route("login", "routes/_public.login.tsx"),
  route("/", "routes/home.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;

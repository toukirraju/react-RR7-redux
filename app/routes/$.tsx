import type { Route } from "./+types/$";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith("/.well-known/")) {
    return new Response(null, { status: 404 });
  }
  
  throw new Response("Not Found", { status: 404 });
}

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}


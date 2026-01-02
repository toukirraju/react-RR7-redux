import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "~/lib/redux/hooks";
import { AppShell } from "@mantine/core";
import { SideNav } from "../ui/SideNav";
import { selectIsAuthenticated } from "~/features/auth/authSelectors";

export function AuthLayout() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector((state) => state.auth.token);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <SideNav />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}


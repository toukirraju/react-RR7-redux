import { Container } from "@mantine/core";
import { Outlet } from "react-router";

export function PublicLayout() {
  return (
    <Container size="sm">
      <Outlet />
    </Container>
  );
}


import { Container } from "@mantine/core";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Container size="sm">
      {children}
    </Container>
  );
}


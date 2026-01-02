import { Title, Text, Card, Stack, Button, Group } from "@mantine/core";
import { useAppSelector } from "~/lib/redux/hooks";
import { useLogoutMutation } from "~/features/auth/authApi";
import { useNavigate } from "react-router";

export function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={1}>Dashboard</Title>
        <Button variant="outline" onClick={handleLogout} loading={isLoading}>
          Logout
        </Button>
      </Group>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={500}>
          Welcome, {user?.firstName || user?.username || "User"}!
        </Text>
        <Text c="dimmed" mt="xs">
          This is your dashboard. You can manage your products and settings here.
        </Text>
        {user && (
          <Stack gap="xs" mt="md">
            <Text size="sm">
              <strong>Email:</strong> {user.email}
            </Text>
            <Text size="sm">
              <strong>Username:</strong> {user.username}
            </Text>
          </Stack>
        )}
      </Card>
    </Stack>
  );
}


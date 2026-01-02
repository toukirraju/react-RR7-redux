import { useState } from "react";
import { Title, TextInput, PasswordInput, Button, Stack, Card, Text, Alert } from "@mantine/core";
import { useLoginMutation } from "~/features/auth/authApi";
import { useNavigate } from "react-router";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password }).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Stack gap="md" align="center" justify="center" style={{ minHeight: "100vh" }}>
      <Card shadow="sm" padding="xl" radius="md" withBorder style={{ width: "100%", maxWidth: 400 }}>
        <Stack gap="md">
          <Title order={1} ta="center">
            Login
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              {error && (
                <Alert color="red" title="Login Failed">
                  Invalid username or password. Try: emilys / emilyspass
                </Alert>
              )}
              <TextInput
                label="Username"
                placeholder="kminchelle"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="0lelplR"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" fullWidth loading={isLoading}>
                Sign In
              </Button>
              <Text size="xs" c="dimmed" ta="center">
                Demo credentials: emilys / emilyspass
              </Text>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Stack>
  );
}


import { Title, Card, Stack, Text, Switch, Group, Button, Select, Divider } from "@mantine/core";
import { useAppSelector } from "~/lib/redux/hooks";

export function SettingsPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Stack gap="md">
      <Title order={1}>Settings</Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="lg">
          <div>
            <Text size="lg" fw={500} mb="md">
              Account Settings
            </Text>
            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Email Notifications</Text>
                  <Text size="sm" c="dimmed">
                    Receive email notifications about your account activity
                  </Text>
                </div>
                <Switch defaultChecked />
              </Group>
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Marketing Emails</Text>
                  <Text size="sm" c="dimmed">
                    Receive emails about new features and updates
                  </Text>
                </div>
                <Switch />
              </Group>
              <Group justify="space-between">
                <div>
                  <Text fw={500}>Two-Factor Authentication</Text>
                  <Text size="sm" c="dimmed">
                    Add an extra layer of security to your account
                  </Text>
                </div>
                <Switch />
              </Group>
            </Stack>
          </div>

          <Divider />

          <div>
            <Text size="lg" fw={500} mb="md">
              Preferences
            </Text>
            <Stack gap="md">
              <Select
                label="Language"
                placeholder="Select language"
                data={["English", "Spanish", "French", "German"]}
                defaultValue="English"
              />
              <Select
                label="Theme"
                placeholder="Select theme"
                data={["Light", "Dark", "Auto"]}
                defaultValue="Light"
              />
              <Select
                label="Timezone"
                placeholder="Select timezone"
                data={["UTC", "EST", "PST", "GMT"]}
                defaultValue="UTC"
              />
            </Stack>
          </div>

          <Divider />

          <Group justify="flex-end">
            <Button variant="light">Cancel</Button>
            <Button>Save Changes</Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}


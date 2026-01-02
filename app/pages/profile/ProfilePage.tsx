import { Title, Card, Stack, Text, Group, Avatar, Button, TextInput, Divider } from "@mantine/core";
import { IconEdit, IconMail, IconUser, IconPhone } from "@tabler/icons-react";
import { useAppSelector } from "~/lib/redux/hooks";
import { selectUser } from "~/features/auth/authSelectors";
import { useGetMeQuery } from "~/features/auth/authApi";

export function ProfilePage() {
  const user = useAppSelector(selectUser);
  const { data: currentUser, isLoading } = useGetMeQuery();

  const displayUser = currentUser || user;

  if (isLoading) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={1}>Profile</Title>
        <Button leftSection={<IconEdit size="1rem" />} variant="light">
          Edit Profile
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="lg">
          <Group>
            <Avatar src={displayUser?.image} size={120} radius="md">
              {displayUser?.firstName?.[0] || displayUser?.username?.[0] || "U"}
            </Avatar>
            <div>
              <Text size="xl" fw={600}>
                {displayUser?.firstName && displayUser?.lastName
                  ? `${displayUser.firstName} ${displayUser.lastName}`
                  : displayUser?.username || "User"}
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                {displayUser?.email}
              </Text>
            </div>
          </Group>

          <Divider />

          <Stack gap="md">
            <TextInput
              label="Username"
              value={displayUser?.username || ""}
              leftSection={<IconUser size="1rem" />}
              readOnly
            />
            <TextInput
              label="Email"
              value={displayUser?.email || ""}
              leftSection={<IconMail size="1rem" />}
              readOnly
            />
            <TextInput
              label="First Name"
              value={displayUser?.firstName || ""}
              readOnly
            />
            <TextInput
              label="Last Name"
              value={displayUser?.lastName || ""}
              readOnly
            />
            <TextInput
              label="Gender"
              value={displayUser?.gender || ""}
              readOnly
            />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}


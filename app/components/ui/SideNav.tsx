import { NavLink } from "react-router";
import {
  NavLink as MantineNavLink,
  ScrollArea,
  Group,
  Text,
  Avatar,
  Button,
  Stack,
} from "@mantine/core";
import {
  IconDashboard,
  IconShoppingBag,
  IconUser,
  IconSettings,
  IconChartBar,
  IconLogout,
} from "@tabler/icons-react";
import { useAppSelector, useAppDispatch } from "~/lib/redux/hooks";
import { selectUser } from "~/features/auth/authSelectors";
import { logout } from "~/features/auth/authSlice";
import { useLogoutMutation } from "~/features/auth/authApi";
import { useNavigate } from "react-router";

const navItems = [
  { icon: IconDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: IconShoppingBag, label: "Products", to: "/products" },
  { icon: IconUser, label: "Profile", to: "/profile" },
  { icon: IconChartBar, label: "Analytics", to: "/analytics" },
  { icon: IconSettings, label: "Settings", to: "/settings" },
];

export function SideNav() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Stack gap="md" p="md" h="100%">
      <ScrollArea style={{ flex: 1 }}>
        <Group gap="xs" mb="xl">
          <Avatar src={user?.image} radius="xl" size="md">
            {user?.firstName?.[0] || user?.username?.[0] || "U"}
          </Avatar>
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.username || "User"}
            </Text>
            <Text size="xs" c="dimmed">
              {user?.email || ""}
            </Text>
          </div>
        </Group>

        <Stack gap="xs">
          {navItems.map((item) => (
            <MantineNavLink
              key={item.to}
              component={NavLink}
              to={item.to}
              label={item.label}
              leftSection={<item.icon size="1.2rem" stroke={1.5} />}
            />
          ))}
        </Stack>
      </ScrollArea>

      <Button
        variant="subtle"
        color="red"
        fullWidth
        leftSection={<IconLogout size="1.2rem" />}
        onClick={handleLogout}
        loading={isLoading}
      >
        Logout
      </Button>
    </Stack>
  );
}


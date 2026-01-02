import { Title, Card, Stack, Text, Group, SimpleGrid, RingProgress, Progress } from "@mantine/core";
import { IconTrendingUp, IconUsers, IconShoppingBag, IconCurrencyDollar } from "@tabler/icons-react";

export function AnalyticsPage() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", icon: IconCurrencyDollar, color: "blue" },
    { label: "Active Users", value: "2,341", icon: IconUsers, color: "green" },
    { label: "Products Sold", value: "1,234", icon: IconShoppingBag, color: "orange" },
    { label: "Growth Rate", value: "+12.5%", icon: IconTrendingUp, color: "violet" },
  ];

  return (
    <Stack gap="md">
      <Title order={1}>Analytics</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {stats.map((stat) => (
          <Card key={stat.label} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  {stat.label}
                </Text>
                <Text fw={700} size="xl" mt="xs">
                  {stat.value}
                </Text>
              </div>
              <stat.icon size="2rem" stroke={1.5} color={`var(--mantine-color-${stat.color}-6)`} />
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Sales Overview
          </Text>
          <RingProgress
            size={200}
            thickness={16}
            sections={[
              { value: 40, color: "blue" },
              { value: 30, color: "green" },
              { value: 20, color: "orange" },
              { value: 10, color: "red" },
            ]}
            label={
              <Text ta="center" fw={700} size="xl">
                40%
              </Text>
            }
          />
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Performance Metrics
          </Text>
          <Stack gap="md">
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>
                  Website Traffic
                </Text>
                <Text size="sm" c="dimmed">
                  75%
                </Text>
              </Group>
              <Progress value={75} color="blue" />
            </div>
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>
                  Conversion Rate
                </Text>
                <Text size="sm" c="dimmed">
                  45%
                </Text>
              </Group>
              <Progress value={45} color="green" />
            </div>
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500}>
                  Customer Satisfaction
                </Text>
                <Text size="sm" c="dimmed">
                  90%
                </Text>
              </Group>
              <Progress value={90} color="orange" />
            </div>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}


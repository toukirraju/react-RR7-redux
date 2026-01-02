import { Title, Text, Card, Stack, Group, Badge, Loader, Alert } from "@mantine/core";
import { useGetProductsQuery } from "~/features/products/productsApi";

export function ProductListPage() {
  const { data, isLoading, error } = useGetProductsQuery({ skip: 0, limit: 30 });

  if (isLoading) {
    return (
      <Stack gap="md" align="center">
        <Loader size="lg" />
        <Text>Loading products...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error">
        Failed to load products. Please try again later.
      </Alert>
    );
  }

  const products = data?.products || [];

  return (
    <Stack gap="md">
      <Title order={1}>Products</Title>
      {products.length > 0 ? (
        <Stack gap="sm">
          {products.map((product) => (
            <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>{product.title}</Text>
                <Badge color="blue">${product.price}</Badge>
              </Group>
              <Text size="sm" c="dimmed" lineClamp={2}>
                {product.description}
              </Text>
              <Group gap="xs" mt="xs">
                <Badge size="sm" variant="light">
                  {product.category}
                </Badge>
                <Badge size="sm" variant="light" color="green">
                  Rating: {product.rating}
                </Badge>
              </Group>
            </Card>
          ))}
        </Stack>
      ) : (
        <Text c="dimmed">No products available</Text>
      )}
    </Stack>
  );
}


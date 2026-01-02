import { Title, Text, Card, Stack, Badge, Button, Group, Loader, Alert, Image } from "@mantine/core";
import { useParams, Link } from "react-router";
import { useGetProductByIdQuery } from "~/features/products/productsApi";

export function ProductDetailsPage() {
  const { id } = useParams();
  const productId = id ? parseInt(id, 10) : 0;
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return (
      <Stack gap="md" align="center">
        <Loader size="lg" />
        <Text>Loading product...</Text>
      </Stack>
    );
  }

  if (error || !product) {
    return (
      <Stack gap="md">
        <Alert color="red" title="Error">
          Product not found
        </Alert>
        <Button component={Link} to="/products">
          Back to Products
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <Button component={Link} to="/products" variant="subtle">
        ← Back to Products
      </Button>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          {product.thumbnail && (
            <Image src={product.thumbnail} alt={product.title} radius="md" />
          )}
          <Group justify="space-between">
            <Title order={1}>{product.title}</Title>
            <Badge size="lg" color="blue">
              ${product.price}
            </Badge>
          </Group>
          <Group gap="xs">
            <Badge variant="light">{product.category}</Badge>
            <Badge variant="light" color="green">
              Rating: {product.rating}
            </Badge>
            <Badge variant="light" color="orange">
              Stock: {product.stock}
            </Badge>
          </Group>
          <Text size="lg">{product.description}</Text>
          {product.brand && (
            <Text size="sm" c="dimmed">
              Brand: {product.brand}
            </Text>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}


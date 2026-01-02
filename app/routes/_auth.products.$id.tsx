import type { Route } from "./+types/_auth.products.$id";
import { ProductDetailsPage } from "~/pages/products/ProductDetailsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Details" },
    { name: "description", content: "Product details page" },
  ];
}

export default function ProductDetails({ params }: Route.ComponentProps) {
  return <ProductDetailsPage />;
}


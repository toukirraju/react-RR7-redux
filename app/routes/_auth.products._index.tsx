import type { Route } from "./+types/_auth.products._index";
import { ProductListPage } from "~/pages/products/ProductListPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Product listing page" },
  ];
}

export default function Products() {
  return <ProductListPage />;
}


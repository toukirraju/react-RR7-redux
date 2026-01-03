
  import { baseApi } from "~/lib/redux/baseApi";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 30 }) => `/products?skip=${skip}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    searchProducts: builder.query<ProductsResponse, string>({
      query: (searchTerm) => `/products/search?q=${searchTerm}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useSearchProductsQuery } = productsApi;


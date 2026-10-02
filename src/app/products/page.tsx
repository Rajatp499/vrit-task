import { ProductType } from "@/types/products";
import { api } from "@/lib/api";
import ProductView from "./_components/ProductView";

interface ProductResponseType {
  data: ProductType[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

async function fetchProducts(page: number) {
  const {
    data,
    totalProducts,
    totalPages,
    currentPage,
    perPage,
  }: ProductResponseType = await api.get(
    `/products?page=${page}&perPage=${10}`,
  );
  return { data, totalPages, currentPage };
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) > 0 ? Number(pageParam) : 1;
  const products = await fetchProducts(page);


  return (
    <>
      <ProductView
        products={products.data}
        currentPage={products.currentPage}
        totalPages={products.totalPages}
      />
    </>
  );
}

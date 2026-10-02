
import { api } from "@/lib/api";
import { ProductType } from "@/types/products";
import { SingleProductView } from "../_components/SingleProductView";

const fetchProduct = async (id: number) => {
  return api.get<ProductType>(`/products/${id}`);
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParams} = await params;
  const product: ProductType = await fetchProduct(Number(idParams));
  return (
    <div>
      <SingleProductView product={product} />
    </div>
  );
}

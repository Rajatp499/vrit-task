"use client";
import { CartCard } from "@/components/cards/Productcard";
import { api } from "@/lib/api";
import { useCartStore } from "@/store/store";
import { ProductType } from "@/types/products";
import { useEffect, useState } from "react";

export default function () {
  const { cart } = useCartStore();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchProducts = async () => {
      if (cart.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const filteredCart = cart.filter((c) => c.items_no >= 1);
        const promises = filteredCart.map((item) =>
          api.get(`/products/${item._id}`),
        );
        const responses = await Promise.all(promises);

        const productData = responses.map((res: any) => res);
        setProducts(productData);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cart]);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading cart…</p>;
  }

  if (products.length === 0) {
    return <p className="p-6 text-center text-gray-500">Cart is empty.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-4  w-fit m-6">
      {products?.length !== 0 &&
        products.map((p) => <CartCard key={p._id} product={p} />)}
    </div>
  );
}

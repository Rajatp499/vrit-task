"use client";

import Image from "next/image";
import { ProductType } from "@/types/products";
import { BsCart } from "react-icons/bs";
import { TextButton } from "../buttons/Button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/store";

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { cart, addItem } = useCartStore();

  const formatDescription = (text: string, wordLimit = 20) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      {" "}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden p-4 h-full max-w-md">
        <div>
          <div className="relative w-full h-96 bg-gray-50 rounded-md overflow-hidden mb-3">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-100 transition-transform duration-200"
            />
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                New
              </span>
            )}
          </div>

          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">
            {product.type}
          </span>

          {/* Title (md) */}
          <h3 className="text-base font-semibold text-gray-900 font-body line-clamp-1 mb-2">
            {product.title}
          </h3>

          {/* Description (Up to ~40 words) */}
          <p className="text-sm text-gray-600 font-body line-clamp-3 mb-4">
            {formatDescription(product.description, 20)}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-2xl font-bold text-primary font-body">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through ml-2">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            <div className="flex items-center text-xs font-semibold text-amber-500">
              ★ <span className="text-gray-700 ml-1">{product.rating}</span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <TextButton
              className="bg-primary hover:bg-primary-hover flex-3"
              onClick={() => {
                router.push(`/products/${product._id}`);
              }}
            >
              View details
            </TextButton>
            <TextButton
              className="flex-2 bg-amber-500"
              onClick={() => {
                addItem(product._id, 1);
              }}
            >
              Add to cart &nbsp; <BsCart size={24} fontWeight={20} />
            </TextButton>
          </div>
        </div>
      </div>
    </>
  );
}

export function CartCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { cart, removeItem } = useCartStore();

  const c = cart.filter((c) => c._id === product._id)[0];
  const formatDescription = (text: string, wordLimit = 20) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      {" "}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden p-4 h-full max-w-md">
        <div>
          <div className="relative w-full h-96 bg-gray-50 rounded-md overflow-hidden mb-3">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-100 transition-transform duration-200"
            />
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                New
              </span>
            )}
          </div>

          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">
            {product.type}
          </span>

          <h3 className="text-base font-semibold text-gray-900 font-body line-clamp-1 mb-2">
            {product.title}
          </h3>

          <p className="text-sm text-gray-600 font-body line-clamp-3 mb-4">
            {formatDescription(product.description, 20)}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-2xl font-bold text-primary font-body">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through ml-2">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center text-xs font-semibold text-amber-500">
              ★ <span className="text-gray-700 ml-1">{product.rating}</span>
            </div>
          </div>
          <div className="mb-1 flex items-center">
            In cart: <span className=" w-fit p-2 ">{c.items_no}</span>
          </div>
          <div className="mb-2 flex items-center">
            Total price:{" "}
            <span className=" w-fit p-2 ">$ {c.items_no * product.price}</span>
          </div>
          <div className="flex justify-between gap-4">
            <TextButton
              className="bg-primary hover:bg-primary-hover flex-3"
              onClick={() => {
                router.push(`/products/${product._id}`);
              }}
            >
              View details
            </TextButton>
            <TextButton
              className="flex-1 bg-red-400"
              onClick={() => {
                removeItem(product._id, 1);
              }}
            >
              Remove from cart
            </TextButton>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import { ProductType } from "@/types/products";
import { FaStar } from "react-icons/fa";
// import { TextButton } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { TextButton } from "@/components/buttons/Button";
import { BsCart } from "react-icons/bs";
import { useCartStore } from "@/store/store";
import { useState } from "react";
import { toast } from "react-toastify";

interface ProductViewProps {
  product: ProductType;
}
interface BrandInitialsProps {
  initials: string;
}
function BrandInitials({ initials }: BrandInitialsProps) {
  const firstLetter = initials ? initials.slice(0, 1) : "";

  return (
    <div className="bg-green-200 w-8 h-8 rounded-full flex items-center justify-center text-xl  font-bold text-green-900">
      {firstLetter}
    </div>
  );
}

export function SingleProductView({ product }: ProductViewProps) {
  const { cart, addItem } = useCartStore();
  const [noOfItems, setNoOfItems] = useState<number>(1);

  const router = useRouter();

  return (
 <>
  <div className="h-auto min-h-[80vh] m-4 md:m-8 lg:m-16">
    <div className="bg-white rounded-2xl flex flex-col lg:flex-row justify-between shadow-xl h-full overflow-hidden">
      <div className="w-full lg:w-[50%] h-100 lg:h-auto">
        <div className="relative w-full h-full bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Details */}
      <div className="w-full lg:w-[50%] flex flex-col p-6 md:p-10 lg:p-16 gap-2">

        <div className="flex gap-4 flex-wrap">
          <div className="bg-amber-200 rounded-md p-1 w-fit">
            {product?.category}
          </div>

          <div className="bg-sky-200 rounded-md p-1 w-fit">
            {product?.type}
          </div>
        </div>

        <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
          {product.title}
        </div>

        <div className="flex gap-2">
          {Array.from(
            { length: Math.round(product.rating) },
            (_, index) => (
              <FaStar
                key={index}
                size={26}
                className="text-amber-300"
              />
            ),
          )}
        </div>

        <div className="text-xl mt-4">
          $ &nbsp;
          <span className="line-through mr-2">
            {product.oldPrice}
          </span>
          <span className="text-3xl">
            {product.price}
          </span>
        </div>

        <div className="text-lg md:text-xl p-2 md:p-6">
          {product.description}
        </div>

        <div className="flex items-center gap-2">
          <BrandInitials initials={product.brand} />
          <span className="text-lg md:text-xl font-bold">
            {product.brand}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3 flex-wrap">
          Available sizes:

          {product.size.map((s) => (
            <div
              className="bg-amber-200 p-1 rounded-md flex justify-center w-8"
              key={s}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="mb-6">
          In stock: {product.stock}
        </div>

        <div className="flex gap-4 md:gap-12 flex-wrap">
          <input
            type="number"
            value={noOfItems}
            min={0}
            onChange={(e: any) => {
              setNoOfItems(e.target.value);
            }}
            className="w-24 md:w-30 px-2 py-1 text-center font-medium text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [&::-webkit-outer-spin-button]:appearance-none"
          />

          <TextButton
            onClick={() => {
              addItem(product._id, noOfItems);
              toast.success(
                `${product.title} added to cart -- no. of items : ${noOfItems}`,
              );
            }}
            className="bg-amber-600"
          >
            Add to cart &nbsp; &nbsp; <BsCart />
          </TextButton>
        </div>

      </div>
    </div>
  </div>
</>
  );
}

"use client";
import { ProductType } from "@/types/products";
import { ProductCard } from "@/components/cards/Productcard";
import { useState, useEffect } from "react";
import { PageButton } from "@/components/buttons/Button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BsCart } from "react-icons/bs";
import { BiCategory, BiLeftArrowAlt } from "react-icons/bi";
import { Input } from "@/components/inputs/Input";
interface ProductTypeProps {
  products: ProductType[];
  totalPages: number;
  currentPage: number;
}
interface PriceRangeType {
  min: number;
  max: number;
}

const ProductView = ({
  products,
  totalPages,
  currentPage,
}: ProductTypeProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pages, setPages] = useState<number[]>([]);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const [searchText, setSearchText] = useState<string>("");
  const [priceRange, setPriceRange] = useState<PriceRangeType>({
    min: 0,
    max: 10000,
  });

  const gotoPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    setSelectedPage(p);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (totalPages > 0) {
      const generatedPages = Array.from(
        { length: totalPages },
        (_, i) => i + 1,
      );
      setPages(generatedPages);
    } else {
      setPages([]);
    }
  }, [totalPages]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLocaleLowerCase()
      .includes(searchText);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchPrices =
      product.price >= priceRange.min && product.price <= priceRange.max;


    return matchesSearch && matchesCategory && matchPrices;
  });
  const changeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const searchFilter = (value: string) => {
    const val = value.toLocaleLowerCase();
    setSearchText(val);
  };

  return (
    <div className="md:m-10 m-2 flex flex-col items-center ">
      <div className=" justify-between flex-col w-full items-center flex md:flex-row">
        <div className="flex gap-4 mb-8">
          <h1>Products</h1>
        </div>
        <div>
          <Input
            type="search"
            placeholder="Search"
            value={searchText}
            onChange={(e) => searchFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 justify-center h-full">
          <div>
            <label>Price from</label>
            <Input
              type="number"
              min={0}
              className="w-20"
              name="min"
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  [e.target.name]: Number(e.target.value) || 0,
                }))
              }
            />
          </div>
          <div>
            <label>Price to</label>
            <Input
              type="number"
              min={0}
              className="w-20"
              name="max"
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  [e.target.name]: Number(e.target.value) || 10000,
                }))
              }
            />
          </div>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => changeCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full flex md:justify-end mb-2 justify-center">
        <div
          className="flex  justify-center items-center bg-slate-400 rounded-full text-white shadow-2xl cursor-pointer h-10 w-10"
          onClick={() => router.push("/cart")}
        >
          <BsCart />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-4  w-fit">
        {products.length === 0
          ? "No products to display"
          : filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
      <div className="flex justify-center items-center gap-2">
        {pages.map((p) => (
          <PageButton
            className={`${p === selectedPage ? "bg-red-400" : "bg-primary"}`}
            onClick={() => gotoPage(p)}
            key={p}
          >
            {p}
          </PageButton>
        ))}
      </div>
    </div>
  );
};

export default ProductView;

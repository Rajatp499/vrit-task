"use client";
import { TextButton } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col gap-20 items-center justify-center h-screen ">
        <div className="font-bold text-2xl">
          Vrit Tech Commerce
          <div onClick={() => router.push("/products")}>
            <TextButton>Products</TextButton>
          </div>
        </div>
        <div>
          Note: This app fetches data from {process.env.NEXT_PUBLIC_API_URL} as
          the original provided link was unavailable during the first 2 days.
          <br />
          Also, {process.env.NEXT_PUBLIC_API_URL} incluedes offset based
          pafination in the /products endpoint <br />
          However, {process.env.NEXT_PUBLIC_API_URL} didn't have any login or
          users endpoint. so for that the provided endpoint was used.
          <br />
          However, {process.env.NEXT_PUBLIC_API_URL} didn't have any login or
          users endpoint. so for that the provided endpoint was used.
          <br />
          <div className="text-center font-bold text-xl">
            <div>Task B:  <Link href="/service" className="text-red-400" >Service</Link> &  <Link href="/course" className="text-red-400"> Course</Link></div>
            I would be glad to clearify any confusions or queries or decision regarding the application. Thank you! </div>
        </div>
      </div>
    </>
  );
}

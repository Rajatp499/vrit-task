// components/AuthGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const noAuth = ["/login","/service","/course"];

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");

    if (!token) {
      router.push("/login");
    } else {
        //no verification provided
      setIsAuthenticated(true);
    }
  }, [router]);

  if (noAuth.includes(pathname)) return <>{children}</>;

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

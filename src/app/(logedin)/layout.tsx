"use client";
import { PathName } from "./Home/components/PathName";
import { usePathname } from "next/navigation";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const shouldShowPathName = !pathname.startsWith("/viewpage");
  return (
    <div>
      {children}
      {shouldShowPathName && (
        <div className="mt-22 ml-40">
          <PathName />
        </div>
      )}
    </div>
  );
}

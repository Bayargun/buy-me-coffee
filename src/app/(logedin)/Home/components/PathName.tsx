"use client";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const buttons = [
  { label: "Home", path: "/Home" },
  { label: "Explore", path: "/explore" },
  { label: "View page", path: "/viewpage" },
  { label: "Account settings", path: "/settings" },
];
export const PathName = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<number | null>(null);

  useEffect(() => {
    const index = buttons.findIndex((item) => item.path === pathname);
    setActiveButton(index);
  }, [pathname]);

  const handleClick = (index: number, path: string) => {
    if (activeButton === index) {
      setActiveButton(null);
    } else {
      setActiveButton(index);
    }
    router.push(path);
  };
  return (
    <div className="w-[251px] h-screen">
      <div className="w-full h-[156px] flex flex-col gap-1">
        {buttons.map((item, index) => {
          const isActive = activeButton === index;
          return (
            <Button
              key={index}
              onClick={() => handleClick(index, item.path)}
              className={`w-full h-10 flex gap-[10px] px-6 py-2  transition-all duration-150 ${
                isActive
                  ? "bg-[#f4f4f5] rounded-[9999px] text-black hover:text-white"
                  : "bg-white text-black hover:text-white"
              }`}
            >
              <p>{item.label}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

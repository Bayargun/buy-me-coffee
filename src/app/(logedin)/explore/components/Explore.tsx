"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../../../_providers/AuthProvider";
import { useEffect, useState } from "react";
import { api } from "../../../../../axios";

type Creator = {
  id: number;
  name: string;
  about: string;
  social: string;
  profile: {
    id: number;
    about: string;
    avatarImage: string;
    name: string;
    socialMediaURL: string;
  };
};
export const Explore = () => {
  const { user } = useAuth();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await api.get("/profile/explore");
        setCreators(res.data);
      } catch (error) {
        console.error("Failed to fetch creators", error);
      }
    };

    fetchCreators();
  }, []);
  const filteredCreators = creators.filter((creator) =>
    creator.profile.name
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase())
  );
  return (
    <div className="w-[957px] h-fit flex flex-col gap-8 px-6 py-6 absolute top-[145px] left-[700px]">
      <div className="w-[909px] h-fit flex flex-col gap-6">
        <div className="w-full h-[88px] flex flex-col gap-6">
          <p className="font-semibold text-[20px]">Explore creaters</p>
          <Input
            placeholder="Search name"
            className="w-[243px] h-[36px]"
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
        </div>
        {filteredCreators.map((item) => (
          <div
            className="w-full h-fit px-6 py-6 rounded-[8px] border border-[#e4e4e7]"
            key={item.id}
          >
            <div className="w-[861px] h-fit flex flex-col gap-3">
              <div className="w-full h-10 flex justify-between">
                <div className="w-[171px] h-full flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={item.profile.avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-[20px]">
                    {item.profile.name}
                  </p>
                </div>
                <Link href={`/profile/${item.profile.id}`}>
                  <Button variant="secondary">
                    View profile <ExternalLinkIcon className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="w-full h-fit flex gap-5">
                <div className="w-[420px] h-fit flex flex-col gap-2">
                  <div className="font-semibold text-[16px]">
                    About {item.profile.name}
                  </div>
                  <div>{item.profile.about}</div>
                </div>
                <div className="w-[420px] h-[64px] flex flex-col gap-2">
                  <div className="font-semibold text-[16px]">
                    Social media URL
                  </div>
                  <div>{item.profile.socialMediaURL}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredCreators.length === 0 && (
          <p className="text-sm text-gray-500">No creators found.</p>
        )}
      </div>
    </div>
  );
};

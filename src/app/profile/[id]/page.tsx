"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { api } from "../../../../axios";
import { Button } from "@/components/ui/button";
import { CoffeeIcon, HeartIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import { Navbar } from "@/app/(user)/create-profile/components/Navbar";
import { toast } from "sonner";
import { useAuth } from "../../../../_providers/AuthProvider";

export default function SelectedProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [socialUrl, setSocialUrl] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/${id}`);
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  const postDon = async () => {
    if (!amount) return;
    setLoading(true);
    console.log("post don", amount, specialMessage, id, socialUrl);
    try {
      await api.post("/donation/give-donation", {
        amount,
        specialMessage,
        recipientId: profile.userId,
        socialUrl,
        senderId: Number(user?.id),
      });
      toast("Amjillttai coffee avj ugluu.");
      setAmount(null);
      setSpecialMessage("");
      setSocialUrl("");
    } catch (error) {
      console.error("Donation failed", error);
      toast("Coffee zamdaa asgarlaa dahin oroldno uu.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <img
        src={profile?.backgroundImage || "./background2.png"}
        className="w-screen h-[400px]"
      />
      <div className="w-[1280px] h-fit flex gap-5 absolute top-[369px] left-[400px]">
        <div className="w-fit h-fit flex flex-col gap-5">
          <div className="w-[632px] h-[273px] flex flex-col gap-2 px-6 py-6 rounded-[8px] border border-[#e4e4e7]  bg-white">
            <div className="w-[191px] h-[48px] flex gap-3">
              <Avatar>
                <AvatarImage src={profile?.avatarImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold text-[20px]">{profile?.name}</p>
            </div>
            <Separator />
            <div className="w-[584px] h-fit flex flex-col gap-3">
              <div className="w-full h-9 text-[16px] font-semibold">
                About {profile?.name}
              </div>
              <div className="w-full h-20 ">{profile?.about}</div>
            </div>
          </div>
          <div className="w-[632px] h-[116px] flex flex-col gap-3 px-6 py-6 rounded-[8px] border border-[#e4e4e7] bg-white ">
            <div className="w-[584px] h-[36px] font-semibold text-[16px]">
              Social media URL
            </div>
            <div className="w-[584px] h-[20xp] ">{profile?.socialMediaURL}</div>
          </div>
          <div className="w-[632px] h-[504px] flex flex-col gap-6 px-6 py-6 rounded-[8px] border border-[#e4e4e7] bg-white ">
            <div className="w-[584px] h-[392px] flex flex-col gap-3">
              <div className="w-full h-[36px] font-semibold text-[16px] ">
                Recent Supporters
              </div>
              <div className="w-full h-[344px] flex flex-col gap-[16px]">
                <div className="w-full h-[140px] flex flex-col gap-6 justify-center items-center border border-[#e4e4e7] rounded-[8px]">
                  <div className="w-[385px] h-[92px] flex flex-col gap-4 justify-center items-center ">
                    <div className="w-[64px] h-[64px] flex items-centers">
                      <HeartIcon />
                    </div>
                    <div className="w-full h-[24px] font-semibold text-[16px] flex justify-center">
                      Be the first one to support {profile?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[628px] h-[509px] flex flex-col gap-8 px-6 py-6 rounded-[8px] border border-[#e4e4e7] bg-white">
          <div className="w-[580px] h-[122px] flex flex-col gap-6">
            <div className="w-full h-[36px] font-semibold text-[16px]">
              Buy {profile?.name} a Coffee
            </div>
            <div className="w-full h-[62px] flex flex-col gap-2">
              <p>Select amount:</p>
              <div className="w-[337px] h-10 flex gap-3">
                {[1, 2, 5, 10].map((val) => (
                  <Button
                    key={val}
                    variant={amount === val ? "default" : "secondary"}
                    onClick={() => setAmount(val)}
                  >
                    <CoffeeIcon className="mr-1" />${val}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[580px] h-[235px] flex flex-col gap-5">
            <div className="w-full h-[62px] flex flex-col gap-2">
              <p className="font-medium text-[14px]">
                Enter BuyMeCoffee or social acount URL:
              </p>
              <Input
                className="w-full h-10 "
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
              ></Input>
            </div>
            <div className="w-full h-[153px] gap-2 flex flex-col">
              <p className="font-medium text-[14px]">Special message:</p>
              <Textarea
                className="w-full h-[131px]"
                value={specialMessage}
                onChange={(e) => setSpecialMessage(e.target.value)}
                placeholder="Thank you for being so awesome everyday!"
              ></Textarea>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={postDon}
            disabled={loading || !amount}
          >
            {loading ? "Sending..." : "Support"}
          </Button>
        </div>
      </div>
    </div>
  );
}

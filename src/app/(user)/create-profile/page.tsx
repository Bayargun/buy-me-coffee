"use client";
import { useEffect, useState } from "react";
import { CompletePro } from "./components/CompletePro";
import { Navbar } from "./components/Navbar";
import { Payment } from "./components/Payment";
import { useAuth } from "../../../../_providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const [step, setStep] = useState<"profile" | "payment">("profile");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user?.profile?.id) {
      setStep("payment");
    } else {
      setStep("profile");
    }

    if (user?.bankCard?.id) {
      router.push("/Home");
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        {step === "profile" && (
          <CompletePro onComplete={() => setStep("payment")} />
        )}
        {step === "payment" && <Payment />}
      </div>
    </div>
  );
}

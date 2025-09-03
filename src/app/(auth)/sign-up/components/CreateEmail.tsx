"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "../../../../../axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../_providers/AuthProvider";
import { toast } from "sonner";
const formSchema = z.object({
  username: z.string().min(3, { message: "Username aldaatai" }),
  email: z.string().email({ message: "Email buruu baina!" }),
  password: z.string().min(3, {
    message: "Invalid password",
  }),
});

export const Email = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signUp(values.username, values.email, values.password);
      toast("amjilttai bvrtgvvllee");
      router.push("/sign-in");
    } catch (error: any) {
      if (error.response?.status === 409) {
        form.setError("email", {
          type: "manual",
          message: "Email or username already exists.",
        });
        form.setError("username", {
          type: "manual",
          message: "Email or username already exists.",
        });
      } else {
        console.error("Sign-up failed:", error);
      }
    }
  };

  return (
    <div className="w-1/2 h-full bg-white flex justify-center items-center relative">
      <Link href="./sign-in">
        {" "}
        <Button className="w-[73px] h-[40px] font-medium text-[14px] text-black bg-[#f4f4f5] cursor-pointer flex absolute top-8 right-20 hover:text-white">
          Log in
        </Button>
      </Link>
      <div className="w-[407px] h-[330px] flex flex-col">
        <div className="w-full h-[106px] flex flex-col gap-[6px] px-6 py-6">
          <p className="font-semibold text-[24px] text-black">
            Welcome, baconpancakes1
          </p>
          <p className="text-[14px] text-[#71717a]">
            Connect email and set a password
          </p>
        </div>
        <div className="w-full h-[160px] pb-6 px-6 pt-0 flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password here"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

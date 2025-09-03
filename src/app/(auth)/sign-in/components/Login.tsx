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
import { useAuth } from "../../../../../_providers/AuthProvider";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const Login = () => {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn(values.email, values.password);
      if (!user) {
        return;
      } else {
        router.push("/create-profile");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="w-1/2 h-full bg-white flex justify-center items-center relative">
      <Link href="./sign-up">
        <Button className="w-[73px] h-[40px] font-medium text-[14px] text-black bg-[#f4f4f5] cursor-pointer flex absolute top-8 right-20 hover:text-white">
          Sign up
        </Button>
      </Link>
      <div className="w-[407] h-[304px] flex flex-col">
        <div className="w-full h-[106px] flex flex-col gap-[6px] px-6 py-6">
          <p className="font-semibold text-[24px] text-black">Welcome back</p>
        </div>
        <div className="w-full h-[160px] pb-6 px-6 pt-0 flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

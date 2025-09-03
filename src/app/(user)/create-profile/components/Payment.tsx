"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../../../../_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { api } from "../../../../../axios";
import { useEffect } from "react";
const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname must match.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must match.",
  }),
  cardnumber: z.string().min(15, {
    message: "Invalid card number.",
  }),
  month: z.string().nonempty({
    message: "Invalid month.",
  }),
  year: z.string().nonempty({
    message: "Invalid year.",
  }),
  cvc: z.string().min(3, {
    message: "Invalid CVC.",
  }),
  country: z.string().min(3, {
    message: "Select country to continue.",
  }),
});
export const Payment = () => {
  const { user, getUser } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      cardnumber: "",
      month: "",
      year: "",
      cvc: "",
      country: "",
    },
  });

  const addBankCard = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.post("/bank/add-bank", {
        country: values.country,
        firstName: values.firstname,
        lastName: values.lastname,
        cardNumber: values.cardnumber,
        CVC: values.cvc,
        userId: Number(user?.id),
        expiryDate: `${values.month}/${values.year}`,
      });
      router.push("/Home");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    getUser();
  }, []);
  function onSubmit(values: z.infer<typeof formSchema>) {
    addBankCard(values);
  }
  return (
    <div className="w-[510px] h-[486px] flex flex-col">
      <div className="w-full h-[106px] flex flex-col gap-[6px] py-[24px]">
        <p className="font-semibold text-[24px]">
          How would you like to be paid?
        </p>
        <p className="text-[14px] text-[#71717a]">
          Enter location and payment details
        </p>
      </div>
      <div className="w-full h-[316px] flex flex-col gap-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[510px] h-[62px] flex flex-col gap-[24px] "
          >
            <div className="w-[510px] h-10">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-[510px] h-10">
                    <FormLabel>Select country</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[510px] h-10">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-[62px] flex gap-3 mt-[24px]">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-[249px] h-10">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-[249px] h-10">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-[62px] flex gap-2 mt-[24px]">
              <FormField
                control={form.control}
                name="cardnumber"
                render={({ field }) => (
                  <FormItem className="w-[510px] h-10">
                    <FormLabel>Enter card number</FormLabel>
                    <FormControl>
                      <Input placeholder="XXXX-XXXX-XXXX-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-[58px] flex gap-4 mt-[24px]">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem className="w-[159px] h-10">
                    <FormLabel>Expires</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[159px] h-10">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-[159px] h-10">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[159px] h-10">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2000">2000</SelectItem>
                          <SelectItem value="2001">2001</SelectItem>
                          <SelectItem value="2002">2002</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem className="w-[159px] h-10">
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="CVC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[510px] h-10 flex gap-[10px] justify-end mt-[24px]">
              <Button type="submit" className="w-[246px] h-10">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

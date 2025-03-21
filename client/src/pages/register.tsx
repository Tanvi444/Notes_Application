import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormSchema } from "@/lib/zod";
import { registerUser } from "@/services/user";
import { useAuthProvider } from "@/context/auth";

export const Register: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { setAccessToken } = useAuthProvider();

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    if (isRegistering) return;
    setIsRegistering(true);

    const response = await registerUser(values);
    if (!response.success) {
      toast.error(response.error?.message ?? "Something went wrong! Please try again.");
      setIsRegistering(false);
      return;
    }

    const accessToken = response.data?.accessToken ?? null;
    setAccessToken(accessToken);
    form.clearErrors();
    form.reset();
    setIsRegistering(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormControl>
                <Input id="name" type="text" placeholder="John Doe" readOnly={isRegistering} {...field} />
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
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="example@gmail.com" readOnly={isRegistering} {...field} />
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password goes here"
                  readOnly={isRegistering}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  readOnly={isRegistering}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isRegistering} className="w-full uppercase tracking-wider">
          Register
        </Button>
      </form>
    </Form>
  );
};

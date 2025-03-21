import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/lib/zod";
import { loginUser } from "@/services/user";
import toast from "react-hot-toast";
import { useAuthProvider } from "@/context/auth";

export const Login: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setAccessToken } = useAuthProvider();

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);

    const response = await loginUser(values);
    if (!response.success) {
      toast.error(response.error?.message ?? "Something went wrong! Please try again.");
      setIsLoggingIn(false);
      return;
    }

    const accessToken = response.data?.accessToken ?? null;
    setAccessToken(accessToken);
    form.clearErrors();
    form.reset();
    setIsLoggingIn(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="example@gmail.com" readOnly={isLoggingIn} {...field} />
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
                  readOnly={isLoggingIn}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoggingIn} className="w-full uppercase tracking-wider">
          Login
        </Button>
      </form>
    </Form>
  );
};

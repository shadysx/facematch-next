"use client";

import { LoadingButton } from "@/components/common/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { SignUpForm } from "@/lib/form-validation/signUpValidationSchema";
import { signUpValidationSchema } from "@/lib/form-validation/signUpValidationSchema";
import { signUpFormDefaultValues } from "@/lib/form-validation/signUpValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function SignUpModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: signUpFormDefaultValues,
    resolver: yupResolver(signUpValidationSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    setSignUpError(null);
    await authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
      },
      {
        onRequest: () => setIsLoading(true),
        onError: (ctx) => {
          setSignUpError(ctx.error.message);
        },
        onResponse: () => setIsLoading(false),
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <Card
        className="w-[400px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input id="password" type="password" {...field} />
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <LoadingButton
              isLoading={isLoading}
              className="w-full"
              type="submit"
            >
              Sign up
            </LoadingButton>
            {signUpError && (
              <p className="text-sm text-red-500">{signUpError}</p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

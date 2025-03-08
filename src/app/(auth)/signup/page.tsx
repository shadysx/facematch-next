"use client";

import { LoadingButton } from "@/components/common/LoadingButton";
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
import Link from "next/link";

export default function SignUpPage() {
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
    mode: "onSubmit",
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
          router.push("/profile");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create an account
          </h1>
          <p className="text-muted-foreground">
            Enter your information to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
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
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
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
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input id="password" type="password" {...field} />
              )}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <LoadingButton
            isLoading={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Sign up
          </LoadingButton>

          {signUpError && (
            <p className="text-sm text-destructive text-center">
              {signUpError}
            </p>
          )}
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/signin"
            className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

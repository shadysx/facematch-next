"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SignInForm,
  signInFormDefaultValues,
  signInValidationSchema,
} from "@/lib/form-validation/signInValidationSchema";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { LoadingButton } from "@/components/common/LoadingButton";
import Link from "next/link";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setSignInError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues: signInFormDefaultValues,
    resolver: yupResolver(signInValidationSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignInForm> = async (data, event) => {
    event?.preventDefault();
    setSignInError(null);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => setIsLoading(true),
        onError: (ctx) => {
          setSignInError(ctx.error.message);
        },
        onResponse: () => setIsLoading(false),
        onSuccess: () => {
          router.push("/brains");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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
                <Input {...field} id="password" type="password" />
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
            Sign in
          </LoadingButton>

          {loginError && (
            <p className="text-sm text-destructive text-center">{loginError}</p>
          )}
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            href="/signup"
            className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

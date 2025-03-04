"use client";

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

export default function SignInModal() {
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
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignInForm> = async (data, event) => {
    event?.preventDefault();
    setSignInError(null);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        // callbackURL: "/brains",
      },
      {
        onRequest: () => setIsLoading(true),
        onError: (ctx) => {
          setSignInError(ctx.error.message);
        },
        onResponse: () => setIsLoading(false),
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
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>Enter your credentials to sign in</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
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
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="password" type="password" />
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
              type="submit"
              className="w-full"
            >
              Sign in
            </LoadingButton>

            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => router.push("/signup")}
            >
              Don&apos;t have an account? Sign up
            </Button>
            {/* TODO: Add a toast for the error */}
            {loginError && (
              <p className="text-sm text-red-500 text-center">{loginError}</p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

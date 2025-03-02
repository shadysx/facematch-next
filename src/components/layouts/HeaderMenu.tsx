"use client"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ToggleThemeButton } from "../shadcn/ToggleThemeButton";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Brain, Home, CreditCard, LogOut } from "lucide-react";

export default function HeaderMenu() {
  const session = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="border-b bg-background/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="group flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                href="/"
              >
                <Home className="h-4 w-4" />
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="group flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                href="/pricing"
              >
                <CreditCard className="h-4 w-4" />
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="group flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                href="/brains"
              >
                <Brain className="h-4 w-4" />
                Brains
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {session.isPending ? (
            <div className="w-[150px] h-9 animate-pulse -muted rounded-md" />
          ) : session.data ? (
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-sm font-medium gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signin">
                  Sign in
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
            </>
          )}
          <div className="w-px h-6 bg-border mx-2" />
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
}

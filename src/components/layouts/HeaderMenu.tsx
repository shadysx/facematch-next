"use client"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ToggleThemeButton } from "../shadcn/ToggleThemeButton";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function HeaderMenu() {
  const session = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                href="/"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Face Match</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[200px] gap-3 p-4">
                  <NavigationMenuLink
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/matches-sfw"
                  >
                    SFW Matches
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/matches-nsfw"
                  >
                    NSFW Matches
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                href="/pricing"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {session.data ? (
            <Button 
              variant="ghost"
              onClick={handleSignOut}
              className="text-sm font-medium"
            >
              Sign out
            </Button>
          ) : (
            <>
              <Link 
                href="/signin"
                className="text-sm font-medium hover:text-primary"
              >
                Sign in
              </Link>
              <Link 
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
            </>
          )}
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
}

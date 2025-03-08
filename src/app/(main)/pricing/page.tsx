"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Zap } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Simple Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your <span className="text-primary">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with our free tier and upgrade as you grow. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                  <span className="text-2xl">Free</span>
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-sm text-muted-foreground">
                    Forever free
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>10 searches per day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Basic face matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>SFW results only</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className="border-primary relative z-0">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="default" className="bg-primary">
                  <Zap className="h-4 w-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                  <span className="text-2xl">Pro</span>
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-sm text-muted-foreground">
                    per month
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Unlimited searches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Advanced AI matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>SFW & NSFW results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Upgrade Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Tier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                  <span className="text-2xl">Enterprise</span>
                  <span className="text-4xl font-bold">Custom</span>
                  <span className="text-sm text-muted-foreground">
                    Contact us
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Custom API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Custom features</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Still have questions? Contact our support team.
          </p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  );
}

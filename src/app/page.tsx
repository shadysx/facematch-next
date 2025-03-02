"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Zap, Database } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            AI-Powered Face Training
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Train Your Own
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"> AI Brain</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create and train personalized AI models to recognize specific faces.
            Perfect for organizing photos and managing facial recognition datasets.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/brains">
              <Button size="lg" className="gap-2">
                Create Your Brain
                <Brain className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="gap-2">
                View Pricing
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-[2.5rem] -z-10" />

            <div className="rounded-[2.5rem] p-8 md:p-12 bg-background/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.02)]">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-none shadow-sm bg-gradient-to-b from-purple-500/5 to-transparent hover:shadow-md hover:shadow-purple-500/10 transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Brain className="h-5 w-5 text-purple-500" />
                      </div>
                      Create a Brain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Start by creating your own AI brain. Each brain can be trained
                      to recognize specific faces or patterns.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-gradient-to-b from-blue-500/5 to-transparent hover:shadow-md hover:shadow-blue-500/10 transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Database className="h-5 w-5 text-blue-500" />
                      </div>
                      Train Your Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Upload your training data. The more images you provide,
                      the more accurate your brain becomes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-gradient-to-b from-purple-500/5 to-transparent hover:shadow-md hover:shadow-purple-500/10 transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Zap className="h-5 w-5 text-purple-500" />
                      </div>
                      Start Recognizing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your trained brain can now recognize faces with high accuracy
                      across your entire dataset.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 rounded-[2.5rem] blur-3xl -z-20" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Train Your First Brain?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with our free tier and upgrade as your needs grow.
            Create your first AI brain in minutes.
          </p>
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Get Started
              <Sparkles className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

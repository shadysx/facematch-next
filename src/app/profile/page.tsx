"use client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Copy, Key, Shield, RefreshCw, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { createApiKey } from "@/utils/createApiKey";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 1234,
  },
  {
    name: "Feb",
    total: 2345,
  },
  {
    name: "Mar",
    total: 3456,
  },
  {
    name: "Apr",
    total: 4567,
  },
  {
    name: "May",
    total: 5678,
  },
  {
    name: "Jun",
    total: 6789,
  },
];

const recentCalls = [
  {
    name: "API Call",
    endpoint: "/brains/query",
    status: "200",
    method: "POST",
    duration: "123ms",
  },
  {
    name: "API Call",
    endpoint: "/brains/train",
    status: "200",
    method: "POST",
    duration: "456ms",
  },
  {
    name: "API Call",
    endpoint: "/brains/status",
    status: "200",
    method: "GET",
    duration: "89ms",
  },
];

export default function ProfilePage() {
  const session = authClient.useSession();
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchApiKeys = async () => {
      const { data: apiKeys, error } = await authClient.apiKey.list();
      if (error) {
        console.error(error);
        return;
      }
      setApiKeys(apiKeys || []);
      console.log("fetchApiKeys", apiKeys);
    };
    fetchApiKeys();
  }, []);

  // TODO: Add toast notification + use the utils => createApiKey()
  const handleCreateApiKey = async () => {
    setIsLoading(true);
    try {
      const { data: newKey, error } = await authClient.apiKey.create({
        name: `API Key ${apiKeys.length + 1}`,
      });

      if (error) throw error;

      console.log("newKey", newKey);
      setApiKeys((prev) => [...prev, newKey]);
    } catch (error) {
      console.error("Failed to create API key:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // TODO: Add toast notification
  };

  // TODO: Add toast notification
  const handleDeleteKey = async (keyId: string) => {
    // try {
    //   const { error } = await authClient.apiKey.delete({ id: keyId });
    //   if (error) throw error;
    //   setApiKeys((prev) => prev.filter((key) => key.id !== keyId));
    // } catch (error) {
    //   console.error("Failed to delete API key:", error);
    // }
  };

  return (
    <div className="container max-w-4xl mx-auto py-10 space-y-8">
      {/* Profile Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and API access
          </p>
        </div>
        <Button variant="outline">
          <Shield className="mr-2 h-4 w-4" />
          Security Settings
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
          <TabsTrigger value="usage">API Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">
                  {session.data?.user.name}
                </p>
              </div>
              <div className="grid gap-2">
                <p className="text-sm font-medium">Email</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {session.data?.user.email}
                  </p>
                  <Badge variant="secondary">Verified</Badge>
                </div>
              </div>
              <div className="grid gap-2">
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-muted-foreground">
                  {/* {new Date(session.data?.user.createdAt).toLocaleDateString()} */}
                  10/03/2025
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          {/* API Keys Section */}
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for accessing the Brain API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Your API Keys</h3>
                  <p className="text-sm text-muted-foreground">
                    Create and manage API keys to access our API
                  </p>
                </div>
                <Button onClick={handleCreateApiKey} disabled={isLoading}>
                  <Key className="mr-2 h-4 w-4" />
                  {isLoading ? "Creating..." : "Generate New Key"}
                </Button>
              </div>

              <div className="space-y-4">
                {[...apiKeys].reverse().map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{apiKey.name}</p>
                      <div className="flex items-center gap-2">
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                          {apiKey.key ?? "********************"}
                        </code>
                        {apiKey.key && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleCopyKey(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created on{" "}
                        {new Date(apiKey.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteKey(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <h4 className="text-sm font-medium mb-2">CLI Usage</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Use your API key with our CLI tool:
                </p>
                <div className="relative">
                  <pre className="overflow-x-auto p-4 rounded-lg bg-background text-sm">
                    {`# Install our CLI
npm install -g @your-org/cli

# Configure your API key
brain config set apiKey YOUR_API_KEY

# List your brains
brain list`}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() =>
                      handleCopyKey("npm install -g @your-org/cli")
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Requests
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52,847</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Latency
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87ms</div>
                <p className="text-xs text-muted-foreground">
                  -5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">
                  +0.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Brains
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>API Usage Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Bar
                      dataKey="total"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent API Calls</CardTitle>
                <CardDescription>
                  Last API calls made to your endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentCalls.map((item) => (
                    <div className="flex items-center" key={item.endpoint}>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.endpoint}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.method} • {item.status} • {item.duration}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

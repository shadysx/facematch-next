"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Terminal, Code2, Braces } from "lucide-react";

const codeExamples = {
  curl: `curl -X POST https://api.brainsoft.com/v1/brains \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Brain",
    "description": "A new brain instance"
  }'`,
  python: `import brainsoft

client = brainsoft.Client(api_key='YOUR_API_KEY')

# Create a new brain
brain = client.brains.create(
    name="My Brain",
    description="A new brain instance"
)

# Query the brain
response = brain.query("What is the meaning of life?")
print(response.text)`,
  javascript: `import { BrainClient } from '@brainsoft/client'

const client = new BrainClient('YOUR_API_KEY')

// Create a new brain
const brain = await client.brains.create({
  name: "My Brain",
  description: "A new brain instance"
})

// Query the brain
const response = await brain.query("What is the meaning of life?")
console.log(response.text)`,
};

export default function DocsPage() {
  return (
    <div className="container max-w-6xl mx-auto py-10 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter">
          Brain API Documentation
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Build intelligent applications with our powerful Brain API. Get
          started with examples in multiple languages.
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Get up and running with the Brain API in minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-6">
            <div className="flex items-center gap-4 mb-4">
              <Terminal className="h-6 w-6" />
              <h3 className="font-semibold">Installation & Authentication</h3>
            </div>
            <Tabs defaultValue="curl" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>
              {Object.entries(codeExamples).map(([lang, code]) => (
                <TabsContent key={lang} value={lang}>
                  <div className="relative">
                    <pre className="overflow-x-auto p-4 rounded-lg bg-background text-sm">
                      <code>{code}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => navigator.clipboard.writeText(code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* API Reference */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              <CardTitle>Endpoints</CardTitle>
            </div>
            <CardDescription>
              Complete reference for all API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  method: "POST",
                  path: "/v1/brains",
                  description: "Create a new brain instance",
                },
                {
                  method: "GET",
                  path: "/v1/brains/{id}",
                  description: "Retrieve brain details",
                },
                {
                  method: "POST",
                  path: "/v1/brains/{id}/query",
                  description: "Query a brain",
                },
              ].map((endpoint) => (
                <div
                  key={endpoint.path}
                  className="flex items-start gap-3 p-3 rounded-lg border"
                >
                  <Badge
                    variant={
                      endpoint.method === "POST" ? "default" : "secondary"
                    }
                  >
                    {endpoint.method}
                  </Badge>
                  <div>
                    <p className="font-mono text-sm">{endpoint.path}</p>
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Braces className="h-5 w-5" />
              <CardTitle>Response Format</CardTitle>
            </div>
            <CardDescription>
              Understanding API responses and error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-semibold mb-2">Success Response</p>
                <pre className="text-sm">
                  {JSON.stringify(
                    {
                      status: "success",
                      data: {
                        id: "brain_123",
                        name: "My Brain",
                        created_at: "2024-03-10T12:00:00Z",
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-semibold mb-2">Error Response</p>
                <pre className="text-sm">
                  {JSON.stringify(
                    {
                      status: "error",
                      error: {
                        code: "invalid_request",
                        message: "Invalid brain configuration",
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

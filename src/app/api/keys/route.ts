import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withAuth } from "@/lib/api-middleware";
import { basicApiKeyConfig } from "@/lib/api-keys/basicApiKeyConfig";

export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    const apiKeys = await auth.api.listApiKeys({ headers: request.headers });
    return NextResponse.json(apiKeys, { status: 200 });
  });
}

// TODO: PREVENT DOUBLE KEYS
export async function POST(request: NextRequest) {
  return withAuth(request, async (session) => {
    try {
      const apiKey = await auth.api.createApiKey({
        body: {
          ...basicApiKeyConfig,
          userId: session.userId,
        },
      });

      return NextResponse.json(apiKey, { status: 200 });
    } catch {
      return NextResponse.json(
        { error: "Failed to create API key" },
        { status: 500 }
      );
    }
  });
}

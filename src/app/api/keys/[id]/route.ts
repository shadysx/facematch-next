import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withAuth } from "@/lib/api-middleware";
import { basicApiKeyConfig } from "@/lib/api-keys/basicApiKeyConfig";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const apiKeys = await auth.api.listApiKeys({
    headers: request.headers,
  });

  const existingApiKey = apiKeys.find((key) => key.id === id);
  if (!existingApiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 404 });
  }

  return withAuth(request, async (session) => {
    const newApiKey = await auth.api.createApiKey({
      body: {
        ...basicApiKeyConfig,
        userId: session.userId,
      },
    });

    await auth.api.deleteApiKey({
      body: {
        keyId: existingApiKey.id,
        userId: session.userId,
      },
      headers: request.headers,
    });

    return NextResponse.json(newApiKey, { status: 200 });
  });
}

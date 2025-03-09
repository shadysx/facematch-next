import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { withBrainAccess } from "@/lib/api-middleware";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withBrainAccess(request, id, async (session) => {
    try {
      const response = await axios.post(
        `${process.env.AI_ENGINE_URL}/ai/users/${session.userId}/brains/${id}/train`
      );

      return NextResponse.json(response.data);
    } catch {
      return NextResponse.json(
        { error: "Failed to train brain" },
        { status: 500 }
      );
    }
  });
}

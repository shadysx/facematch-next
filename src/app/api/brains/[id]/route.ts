import { withBrainAccess } from "@/lib/api-middleware";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withBrainAccess(req, id, async (session) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Delete the brain on the database
        const brain = await tx.brain.delete({
          where: {
            id,
          },
        });

        // Delete the brain on the AI-ENGINE
        try {
          await axios.delete(
            `${process.env.AI_ENGINE_URL}/ai/brains?user_id=${session.userId}&brain_id=${id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          throw new Error(`AI-ENGINE Error: ${axios.isAxiosError(error)}`);
        }

        return brain;
      });

      return NextResponse.json(result, { status: 200 });
    } catch {
      return NextResponse.json(
        { error: "Failed to delete brain" },
        { status: 500 }
      );
    }
  });
}

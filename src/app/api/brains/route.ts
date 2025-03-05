import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { withAuth } from "@/lib/api-middleware";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  return withAuth(req, async (session) => {
    try {
      const brains = await prisma.brain.findMany({
        where: {
          userId: session.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({
        brains,
      });
    } catch {
      return NextResponse.json({
        error: "Failed to fetch brains",
      });
    }
  });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  return withAuth(req, async (session) => {
    try {
      const existingBrain = await prisma.brain.findFirst({
        where: {
          name: {
            equals: name.toLowerCase().trim(),
          },
          userId: session.userId,
        },
      });
      if (existingBrain) {
        console.log("A brain with this name already exists");
        return NextResponse.json(
          { error: "A brain with this name already exists" },
          { status: 400 }
        );
      }

      const result = await prisma.$transaction(async (tx) => {
        const brain = await tx.brain.create({
          data: {
            name: name.toLowerCase().trim(),
            userId: session.userId,
          },
        });

        try {
          await axios.post(
            `http://127.0.0.1:8000/ai/brains?user_id=${session.userId}&brain_id=${brain.id}`,
            null,
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

      return NextResponse.json(result);
    } catch {
      return NextResponse.json(
        { error: "Error creating brain" },
        { status: 500 }
      );
    }
  });
}

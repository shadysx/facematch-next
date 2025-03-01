import { NextResponse } from 'next/server'

import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if (!session?.user) {
        return NextResponse.json(
            {error: 'You must be logged in'}, { status: 401 });
    }

    try {
        const brains = await prisma.brain.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            brains
        });
    } catch {
        return NextResponse.json({
            error: "Failed to fetch brains"
        });
    }
}

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if (!session?.user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  
    const { name } = await req.json()

    const existingBrain = await prisma.brain.findFirst({
        where: {
            name: {
                equals: name.toLowerCase()
            },
            userId: session.user.id
        }
    })

    if (existingBrain) {
        return NextResponse.json(
            { error: 'A brain with this name already exists' },
            { status: 400 }
        )
    }

    // Create the brain on the AI-ENGINE
    



    const brain = await prisma.brain.create({
        data: {
            name: name.toLowerCase(),
            userId: session.user.id
        }
    })
    return NextResponse.json(brain)
}


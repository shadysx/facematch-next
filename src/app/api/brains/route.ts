import { NextResponse } from 'next/server'

import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import axios from 'axios';
 
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

    try {
        if (existingBrain) {
            return NextResponse.json(
                { error: 'A brain with this name already exists' },
                { status: 400 }
            )
        }

        // Create the brain on the database
        const brain = await prisma.brain.create({
            data: {
                name: name.toLowerCase().trim(),
                userId: session.user.id
            }
        })

        // Create the brain on the AI-ENGINE
        try {
            await axios.post(
                `http://127.0.0.1:8000/ai/brains?user_id=${session.user.id}&brain_id=${brain.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('AI-ENGINE Error:', error.response?.data);
                    return NextResponse.json(
                        { error: 'Error creating brain on AI-ENGINE' },
                        { status: 500 }
                    );
                }
            } 

        return NextResponse.json(brain);
    } catch {
        return NextResponse.json({ error: 'Error creating brain on database' }, { status: 500 });
    }


}


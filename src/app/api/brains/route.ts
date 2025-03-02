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
            { error: 'You must be logged in' }, { status: 401 });
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

        const result = await prisma.$transaction(async (tx) => {
            const brain = await tx.brain.create({
                data: {
                    name: name.toLowerCase().trim(),
                    userId: session.user.id
                }
            });

            try {
                await axios.post(
                    `http://127.0.0.1:8000/ai/brains?user_id=${session.user.id}&brain_id=${brain.id}`,
                    null,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            } catch (error) {
                throw new Error(`AI-ENGINE Error: ${axios.isAxiosError(error)}`);
            }

            return brain;
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error('Transaction failed:', error);

        return NextResponse.json(
            { error: 'Error creating brain' },
            { status: 500 }
        );
    }
}


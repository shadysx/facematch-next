import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if (!session?.user) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const { id } = await params

    try {
        const isBrainFromUser = await prisma.brain.findUnique({
            where: {
                id,
                userId: session.user.id
            }
        })

        if (!isBrainFromUser) {
            return NextResponse.json({ error: 'User does not have access to this brain' }, { status: 403 })
        }

        // Delete the brain on the database
        await prisma.brain.delete({
            where: {
                id
            }
        })

        // Delete the brain on the AI-ENGINE
        try {
            await axios.delete(
                `http://127.0.0.1:8000/ai/brains?user_id=${session.user.id}&brain_id=${id}`,
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
                    { error: 'Error deleting brain on AI-ENGINE' },
                    { status: 500 }
                );
            }
        }


        return NextResponse.json({ success: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: 'Failed to delete brain' }, { status: 500 })
    }
}

import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    console.log("DELETE")
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

        await prisma.brain.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ success: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: 'Failed to delete brain' }, { status: 500 })
    }
}

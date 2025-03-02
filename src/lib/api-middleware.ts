import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { Session } from "better-auth"

const prisma = new PrismaClient()

export async function withAuth(
    request: NextRequest,
    handler: (session: Session) => Promise<NextResponse>
) {
    const session = await auth.api.getSession({
        headers: request.headers,
    })

    if (!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    return handler(session.session)
}

export async function withBrainAccess(
    request: NextRequest,
    brainId: string,
    handler: (session: Session) => Promise<NextResponse>
) {
    return withAuth(request, async (session) => {
        const userHasAccessToBrain = await prisma.brain.findUnique({
            where: {
                id: brainId,
                userId: session.userId
            }
        })

        if (!userHasAccessToBrain) {
            return NextResponse.json(
                { error: "User does not have access to this brain" },
                { status: 403 }
            )
        }

        return handler(session)
    })
}
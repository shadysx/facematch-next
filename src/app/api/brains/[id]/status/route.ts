import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userHasAccessToBrain = await prisma.brain.findUnique({
            where: {
                id: id,
                userId: session.user.id
            }
        })

        if (!userHasAccessToBrain) {
            return NextResponse.json(
                { error: 'User does not have access to this brain' },
                { status: 403 }
            );
        }

        const response = await axios.get(
            `http://127.0.0.1:8000/ai/users/${session.user.id}/brains/${id}/status`
        );

        return NextResponse.json(response.data);

    } catch (error) {
        console.error('Error checking brain status:', error);
        return NextResponse.json(
            { error: 'Failed to check brain status' },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { brainId: string; filename: string } }
) {
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

        const { brainId, filename } = await params;

        const userHasAccessToBrain = await prisma.brain.findUnique({
            where: {
                id: brainId,
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
            `http://127.0.0.1:8000/ai/users/${session.user.id}/brains/${brainId}/files/${filename}`,
            {
                responseType: 'arraybuffer'
            }
        );

        const blob = new Blob([response.data], {
            type: response.headers['content-type']
        });

        return new NextResponse(blob, {
            headers: {
                'Content-Type': response.headers['content-type'],
                'Content-Disposition': `inline; filename="${filename}"`
            }
        });

    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json(
            { error: 'Failed to fetch image' },
            { status: 500 }
        );
    }
} 
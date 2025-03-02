import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { FormData } from 'formdata-node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { brainId: string } }
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

        const response = await axios.get(
            `http://127.0.0.1:8000/ai/users/${session.user.id}/brains/${params.brainId}/files`
        );

        return NextResponse.json(response.data);

    } catch (error) {
        console.error('Error fetching files:', error);
        return NextResponse.json(
            { error: 'Failed to fetch files' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { brainId: string } }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const files = formData.getAll('files');



        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files provided' },
                { status: 400 }
            );
        }

        const { brainId } = await params;

        if (!brainId) {
            return NextResponse.json(
                { error: 'Brain ID is required' },
                { status: 400 }
            );
        }

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

        const apiFormData = new FormData();
        files.forEach((file) => {
            apiFormData.append('files', file);
        });

        const response = await axios.post(
            `http://127.0.0.1:8000/ai/users/${session.user.id}/brains/${brainId}/files`,
            apiFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return NextResponse.json(response.data);

    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { FormData } from 'formdata-node';
import { withBrainAccess } from '@/lib/api-middleware';

export async function GET(
    req: NextRequest,
    { params }: { params: { brainId: string } }
) {
    const { brainId } = await params;

    return withBrainAccess(req, brainId, async (session) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/ai/users/${session.userId}/brains/${brainId}/files`
            );

            return NextResponse.json(response.data);

        } catch {
            return NextResponse.json(
                { error: 'Failed to fetch files' },
                { status: 500 }
            );
        }
    })
}

export async function POST(
    req: NextRequest,
    { params }: { params: { brainId: string } }
) {
    const { brainId } = await params;

    return withBrainAccess(req, brainId, async (session) => {
        try {
            const formData = await req.formData();
            const files = formData.getAll('files');

            if (!files || files.length === 0) {
                return NextResponse.json(
                    { error: 'No files provided' },
                    { status: 400 }
                );
            }

            const apiFormData = new FormData();
            files.forEach((file) => {
                apiFormData.append('files', file);
            });

            const response = await axios.post(
                `http://127.0.0.1:8000/ai/users/${session.userId}/brains/${brainId}/files`,
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
    })
}

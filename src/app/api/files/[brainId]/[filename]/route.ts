import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { withBrainAccess } from '@/lib/api-middleware';

export async function GET(
    request: NextRequest,
    { params }: { params: { brainId: string; filename: string } }
) {
    const { brainId, filename } = await params;

    return withBrainAccess(request, brainId, async (session) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/ai/users/${session.userId}/brains/${brainId}/files/${filename}`,
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
        } catch {
            return NextResponse.json(
                { error: 'Failed to fetch image' },
                { status: 500 }
            );
        }
    })
} 
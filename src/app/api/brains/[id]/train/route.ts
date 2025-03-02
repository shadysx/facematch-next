import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { withBrainAccess } from '@/lib/api-middleware';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    return withBrainAccess(request, id, async (session) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/ai/users/${session.userId}/brains/${id}/train`
            );

            return NextResponse.json(response.data);
        } catch {
            return NextResponse.json(
                { error: 'Failed to train brain' },
                { status: 500 }
            );
        }
    })
}
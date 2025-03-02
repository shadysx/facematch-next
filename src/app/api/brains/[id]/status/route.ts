import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { withBrainAccess } from '@/lib/api-middleware';


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    return withBrainAccess(request, id, async (session) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/ai/users/${session.userId}/brains/${id}/status`
            );

            return NextResponse.json(response.data);

        } catch (error) {
            console.error('Error checking brain status:', error);
            return NextResponse.json(
                { error: 'Failed to check brain status' },
                { status: 500 }
            );
        }
    })
}
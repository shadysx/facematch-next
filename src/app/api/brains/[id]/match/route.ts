import axios from "axios";
import { withBrainAccess } from "@/lib/api-middleware";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const formData = await request.formData();
    const file = formData.get('file');

    return withBrainAccess(request, id, async (session) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('file', file as Blob);

            const response = await axios.post(
                `http://127.0.0.1:8000/ai/users/${session.userId}/brains/${id}/match`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return NextResponse.json(response.data);
        } catch (error) {
            console.error('Error matching face:', error);
            return NextResponse.json(
                { error: 'Failed to match face' },
                { status: 500 }
            );
        }
    })
}
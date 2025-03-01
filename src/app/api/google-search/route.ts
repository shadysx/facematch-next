import { NextResponse } from 'next/server';
import GoogleImages from 'google-images';

const client = new GoogleImages(
  process.env.GOOGLE_CSE_ID,
  process.env.GOOGLE_API_KEY
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({
      error: {
        code: 'MISSING_QUERY',
        message: 'Query parameter is required',
        status: 400
      }
    });
  }

  try {
    const results = await client.search(query);
    return NextResponse.json({
      data: results[0].url
    });
  } catch {
    return NextResponse.json({
      error: {
        code: 'GOOGLE_SEARCH_FAILED',
        message: 'Failed to fetch images',
        status: 500,
      }
    });
  }
}
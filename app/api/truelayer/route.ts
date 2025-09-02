import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'TrueLayer integration endpoint',
    note: 'Configure TRUELAYER_CLIENT_ID and TRUELAYER_CLIENT_SECRET in Vercel environment variables'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // This would handle TrueLayer operations
    // For now, return a placeholder response
    return NextResponse.json({
      success: true,
      message: 'TrueLayer operation would be processed here',
      action: body.action || 'unknown'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { handleRedirectCallback } from '@/lib/auth0';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');

    // Handle Auth0 errors
    if (error) {
      console.error('Auth0 callback error:', error, error_description);
      return NextResponse.redirect(
        new URL(`/signin?error=${encodeURIComponent(error_description || error)}`, request.url)
      );
    }

    // Handle the callback on the client side
    // Auth0 SPA SDK handles the callback in the browser
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating...</title>
          <meta charset="utf-8" />
          <script>
            // Let Auth0 SPA SDK handle the callback
            window.location.href = '/?code=${code}&state=${state}';
          </script>
        </head>
        <body>
          <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="text-align: center;">
              <h2>Authenticating...</h2>
              <p>Please wait while we complete your login.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(
      new URL('/signin?error=callback_error', request.url)
    );
  }
}

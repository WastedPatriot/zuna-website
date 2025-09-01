import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { auth0Config } from '@/lib/auth0-config';

// Custom login handler with cross-platform support
const customLogin = handleLogin({
  returnTo: '/dashboard',
  authorizationParams: {
    audience: auth0Config.audience,
    scope: auth0Config.scope,
    prompt: 'login',
    // Add custom parameters for mobile app detection
    connection: auth0Config.databaseConnection,
  },
  getLoginState: (req: NextRequest) => {
    // Check if login is from mobile app
    const isMobile = req.headers.get('x-platform') === 'mobile';
    const screenHint = req.nextUrl.searchParams.get('screen_hint');
    
    return {
      returnTo: isMobile ? auth0Config.mobileRedirectUri : '/dashboard',
      screenHint: screenHint || undefined,
    };
  },
});

// Custom callback handler to sync data across platforms
const customCallback = handleCallback({
  afterCallback: async (req: NextRequest, session: any) => {
    try {
      // Extract user metadata
      const userMetadata = {
        email: session.user.email,
        name: session.user.name,
        picture: session.user.picture,
        sub: session.user.sub,
        isPremium: session.user[`${auth0Config.customClaimsNamespace}is_premium`] || false,
        platform: req.headers.get('x-platform') || 'web',
        lastLogin: new Date().toISOString(),
      };
      
      // Store in session for cross-platform access
      session.userMetadata = userMetadata;
      
      // If this is a mobile login, prepare mobile-specific data
      if (userMetadata.platform === 'mobile') {
        session.mobileToken = session.accessToken;
        session.returnTo = auth0Config.mobileRedirectUri;
      }
      
      return session;
    } catch (error) {
      console.error('Callback error:', error);
      return session;
    }
  },
});

// Custom profile handler to get user data for mobile app
const customProfile = handleProfile({
  refetch: true,
  afterRefetch: async (req: NextRequest, session: any) => {
    // Add custom claims and metadata
    const userProfile = {
      ...session.user,
      metadata: {
        isPremium: session.user[`${auth0Config.customClaimsNamespace}is_premium`] || false,
        zunaCoins: session.user[`${auth0Config.customClaimsNamespace}zuna_coins`] || 0,
        dailyPlaysRemaining: session.user[`${auth0Config.customClaimsNamespace}daily_plays`] || 1,
        highScore: session.user[`${auth0Config.customClaimsNamespace}high_score`] || 0,
      },
    };
    
    return userProfile;
  },
});

// Export the auth handler
export const GET = handleAuth({
  login: customLogin,
  logout: handleLogout({
    returnTo: '/',
  }),
  callback: customCallback,
  profile: customProfile,
  // Add signup route
  signup: handleLogin({
    authorizationParams: {
      screen_hint: 'signup',
      audience: auth0Config.audience,
      scope: auth0Config.scope,
    },
    returnTo: '/dashboard',
  }),
});

// Handle POST requests for mobile app authentication
export async function POST(req: NextRequest) {
  const body = await req.json();
  
  if (body.action === 'mobile-auth') {
    // Handle mobile app authentication
    const response = NextResponse.json({
      success: true,
      redirectUrl: `/api/auth/login?platform=mobile`,
    });
    
    response.headers.set('x-platform', 'mobile');
    return response;
  }
  
  if (body.action === 'sync-profile') {
    // Sync profile data between platforms
    try {
      // This would connect to your database or Auth0 Management API
      // to sync user data across platforms
      return NextResponse.json({
        success: true,
        message: 'Profile synced successfully',
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: 'Failed to sync profile',
      }, { status: 500 });
    }
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
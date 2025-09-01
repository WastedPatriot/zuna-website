import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/dashboard',
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email'
    }
  }),
  logout: handleLogout({
    returnTo: '/'
  }),
  callback: handleCallback({
    afterCallback: async (req: NextRequest, session: any) => {
      // You can add custom logic here after successful authentication
      return session;
    }
  })
});
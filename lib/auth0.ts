import { Auth0Client } from '@auth0/auth0-spa-js';

// Shared Auth0 configuration between app and website
const auth0Config = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || 'your-domain.auth0.com',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'your-client-id',
  redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || 'https://api.gozuna.co.uk',
  scope: 'openid profile email offline_access',
};

let auth0Client: Auth0Client | null = null;

export const getAuth0Client = async () => {
  if (!auth0Client && typeof window !== 'undefined') {
    auth0Client = new Auth0Client({
      domain: auth0Config.domain,
      clientId: auth0Config.clientId,
      authorizationParams: {
        redirect_uri: auth0Config.redirectUri,
        audience: auth0Config.audience,
        scope: auth0Config.scope,
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    });
  }
  return auth0Client;
};

export const loginWithRedirect = async () => {
  const client = await getAuth0Client();
  if (client) {
    await client.loginWithRedirect({
      appState: { returnTo: '/dashboard' },
    });
  }
};

export const handleRedirectCallback = async () => {
  const client = await getAuth0Client();
  if (client) {
    const result = await client.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
    return result;
  }
};

export const logout = async () => {
  const client = await getAuth0Client();
  if (client) {
    client.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
};

export const getUser = async () => {
  const client = await getAuth0Client();
  if (client) {
    try {
      return await client.getUser();
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }
  return null;
};

export const getAccessToken = async () => {
  const client = await getAuth0Client();
  if (client) {
    try {
      return await client.getTokenSilently();
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }
  return null;
};

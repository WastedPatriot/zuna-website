// Auth0 Configuration for ZUNA Platform
// This configuration is shared between website and mobile app

export const auth0Config = {
  domain: 'dev-zuna.us.auth0.com', // Replace with your Auth0 domain
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'your_auth0_client_id',
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || 'https://api.zuna.finance',
  scope: 'openid profile email offline_access',
  redirectUri: typeof window !== 'undefined' ? window.location.origin + '/api/auth/callback' : '',
  postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : '',
  
  // Mobile app configuration
  mobileRedirectUri: 'zuna://auth/callback',
  mobilePostLogoutRedirectUri: 'zuna://auth/logout',
  
  // API endpoints
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.zuna.finance',
  
  // Features
  enablePasswordless: false,
  enableSocialLogin: true,
  socialProviders: ['google', 'apple', 'facebook'],
  
  // Custom claims namespace
  customClaimsNamespace: 'https://zuna.finance/',
  
  // Database connection name (for username/password auth)
  databaseConnection: 'Username-Password-Authentication',
};

// Helper function to get user metadata
export const getUserMetadata = (user: any) => {
  const namespace = auth0Config.customClaimsNamespace;
  return {
    isPremium: user[`${namespace}is_premium`] || false,
    zunaCoins: user[`${namespace}zuna_coins`] || 0,
    dailyPlaysRemaining: user[`${namespace}daily_plays`] || 1,
    lastPlayDate: user[`${namespace}last_play_date`] || null,
    highScore: user[`${namespace}high_score`] || 0,
  };
};

// Helper to sync user data across platforms
export const syncUserData = async (accessToken: string, userData: any) => {
  try {
    const response = await fetch(`${auth0Config.apiBaseUrl}/user/sync`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync user data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error syncing user data:', error);
    throw error;
  }
};

// Auth0 Configuration
// For production, these values should come from environment variables

export const auth0Config = {
  // These are placeholder values - replace with your Auth0 application settings
  domain: process.env.AUTH0_ISSUER_BASE_URL || 'https://dev-placeholder.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || 'placeholder_client_id',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || 'placeholder_client_secret',
  baseUrl: process.env.AUTH0_BASE_URL || 'http://localhost:3000',
  secret: process.env.AUTH0_SECRET || 'placeholder_secret_at_least_32_characters_long_for_production',
};

// Export a flag to check if Auth0 is properly configured
export const isAuth0Configured = !!(
  process.env.AUTH0_ISSUER_BASE_URL &&
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET &&
  process.env.AUTH0_SECRET
);

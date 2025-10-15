# Auth0 Admin User Setup

## Creating Admin User in Auth0

Since we've migrated from Supabase to Auth0, you need to create a new admin user in the Auth0 dashboard.

### Step 1: Access Auth0 Dashboard
1. Go to https://manage.auth0.com/
2. Log in with your Auth0 account
3. Select the "Zuna" application

### Step 2: Create Admin User
1. Navigate to **User Management** → **Users**
2. Click **Create User**
3. Enter the following details:
   - Email: `admin@gozuna.co.uk`
   - Password: `ZunaAdmin2024!` (or your preferred secure password)
   - Connection: `Username-Password-Authentication`

### Step 3: Add Admin Metadata
1. Click on the newly created user
2. Go to the **User Details** tab
3. In the **user_metadata** section, add:
   ```json
   {
     "is_admin": true,
     "name": "Admin User",
     "account_type": "adult"
   }
   ```
4. Save the changes

### Step 4: Add Admin Role (Optional)
1. Go to **User Management** → **Roles**
2. Create a new role called "Admin"
3. Add permissions as needed
4. Assign this role to the admin user

## Mobile App Admin Access

The mobile app currently uses a hidden gesture pattern to access the admin panel:

1. Tap the screen in this sequence:
   - Top-left corner
   - Top-right corner  
   - Top-left corner
   - Bottom-right corner
   - Bottom-left corner

2. This opens the admin login screen

### Updating Mobile App for Auth0 Admin

The mobile app needs to be updated to check for Auth0 admin status instead of Supabase. The admin check should look for:
- `user_metadata.is_admin === true`
- Or check for an "Admin" role

## Website Admin Access

For the website, admin features can be shown based on:
```javascript
const isAdmin = user?.user_metadata?.is_admin === true;
```

## Security Notes

- The admin gesture pattern should only be available in production builds
- Consider implementing IP whitelisting for admin access
- Enable MFA for the admin account in Auth0
- Regularly rotate the admin password

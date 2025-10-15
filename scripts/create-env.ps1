# PowerShell script to create .env.local file for Zuna website
# Run this script from the zuna-website directory

Write-Host "Creating .env.local file for Zuna website..." -ForegroundColor Green

# Create website .env.local file
$envContent = @"
# Auth0 Configuration
NEXT_PUBLIC_AUTH0_DOMAIN=dev-jjvz7ybpvs8nbsi7.uk.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=gYYex1wZVUQTP5n6fM7twTrAqe2S6oF6
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.zuna.app

# API Configuration
NEXT_PUBLIC_API_URL=https://api.zuna.app

# Optional: Analytics (add your tracking ID if you have one)
NEXT_PUBLIC_GA_TRACKING_ID=
"@

# Write .env.local
Write-Host "Creating .env.local..." -ForegroundColor Yellow
$envContent | Out-File -FilePath ".env.local" -Encoding utf8

Write-Host "`n✅ .env.local file created successfully!" -ForegroundColor Green
Write-Host "`nIMPORTANT: This file contains sensitive configuration and should NEVER be committed to git." -ForegroundColor Red
Write-Host "It is already included in .gitignore for safety." -ForegroundColor Yellow
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Restart your development server (npm run dev)" -ForegroundColor White
Write-Host "2. The Auth0 callback should now work properly" -ForegroundColor White

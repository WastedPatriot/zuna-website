# Deploy Zuna Website to gozuna.co.uk

## Quick Deployment Guide (10 minutes)

### Option 1: Deploy with Vercel (Recommended - FREE)

#### Step 1: Push to GitHub
1. Go to [github.com](https://github.com) and create a new repository called "zuna-website"
2. Run these commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/zuna-website.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" → Continue with GitHub
3. Click "Add New..." → "Project"
4. Import your `zuna-website` repository
5. Click "Deploy" (no configuration needed!)
6. Wait 2-3 minutes for deployment

#### Step 3: Connect gozuna.co.uk Domain
1. In Vercel, go to your project → Settings → Domains
2. Type `gozuna.co.uk` and click "Add"
3. Also add `www.gozuna.co.uk`
4. Vercel will show you DNS records to add

#### Step 4: Configure GoDaddy DNS
1. Log into GoDaddy
2. Go to "My Products" → Find gozuna.co.uk → Click "DNS"
3. **Delete all existing A records and CNAME records**
4. Add these records:

**For gozuna.co.uk (root domain):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: `600`

**For www.gozuna.co.uk:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `600`

5. Click "Save All Records"

#### Step 5: Wait and Verify
- DNS changes take 5-30 minutes
- Your website will be live at https://gozuna.co.uk
- SSL certificate is automatic and free!

---

### Option 2: Quick Static Deploy to GoDaddy

If you prefer hosting directly on GoDaddy:

#### Step 1: Build for Static Export
1. Edit `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
module.exports = nextConfig
```

2. Build the site:
```bash
npm run build
```

#### Step 2: Upload to GoDaddy
1. Download [FileZilla](https://filezilla-project.org/)
2. Connect to GoDaddy:
   - Host: `ftp.gozuna.co.uk`
   - Username: (Your GoDaddy FTP username)
   - Password: (Your GoDaddy FTP password)
   - Port: `21`

3. Navigate to `public_html` folder
4. Upload everything from the `out` folder
5. Done! Visit https://gozuna.co.uk

---

## Need Help?

### Vercel Not Working?
- Make sure repository is public on GitHub
- Try disconnecting and reconnecting domain

### GoDaddy DNS Not Updating?
- Clear browser cache
- Try incognito mode
- Check at https://dnschecker.org/#A/gozuna.co.uk

### Want Custom Email?
Add these MX records in GoDaddy for email@gozuna.co.uk:
- Priority: 10, Value: mx1.privateemail.com
- Priority: 10, Value: mx2.privateemail.com

---

## Your Domain Status
Current: gozuna.co.uk (owned on GoDaddy)
Target: Live website at https://gozuna.co.uk

Estimated time: 10-15 minutes total

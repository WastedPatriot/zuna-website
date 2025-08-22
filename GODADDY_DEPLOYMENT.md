# GoDaddy Deployment Guide for Zuna Website

## Prerequisites
- GoDaddy hosting account with Node.js support
- Domain name (e.g., gozuna.co.uk)
- FTP/SFTP access credentials

## Option 1: Deploy to Vercel (Recommended) + GoDaddy Domain

### Step 1: Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up/login with GitHub
4. Click "New Project"
5. Import your `zuna-website` repository
6. Click "Deploy"
7. Your site will be live at `your-project.vercel.app`

### Step 2: Connect GoDaddy Domain to Vercel
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain: `gozuna.co.uk` and `www.gozuna.co.uk`
4. Vercel will show you DNS records to add

### Step 3: Configure GoDaddy DNS
1. Log into GoDaddy
2. Go to "My Products" → Your Domain → "DNS"
3. Delete existing A records
4. Add these records:

**For root domain (gozuna.co.uk):**
- Type: A
- Name: @
- Value: 76.76.21.21
- TTL: 600

**For www subdomain:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com
- TTL: 600

### Step 4: Wait for DNS Propagation
- DNS changes can take 5 minutes to 48 hours
- Check status at: https://dnschecker.org

## Option 2: Traditional Hosting on GoDaddy

### Step 1: Build the Next.js App
```bash
cd zuna-website
npm run build
```

### Step 2: Prepare for Deployment
Create a `server.js` file:
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Step 3: Upload via FTP
1. Connect to GoDaddy via FTP (FileZilla recommended)
   - Host: ftp.yourdomain.com
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

2. Upload these folders/files:
   - `.next/` folder
   - `public/` folder
   - `node_modules/` folder
   - `package.json`
   - `package-lock.json`
   - `server.js`
   - `next.config.js`

### Step 4: Configure Node.js on GoDaddy
1. Log into GoDaddy hosting panel
2. Go to "Node.js" section
3. Create new application:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: Your upload directory
   - Application startup file: server.js
4. Click "Create"

### Step 5: Install Dependencies
1. In GoDaddy Node.js panel
2. Click "Run NPM Install"
3. Wait for completion

### Step 6: Start Application
1. Click "Start" in Node.js panel
2. Your site should be live!

## Option 3: Static Export (Simplest)

### Step 1: Configure for Static Export
Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

### Step 2: Build Static Files
```bash
npm run build
```

### Step 3: Upload to GoDaddy
1. Connect via FTP
2. Navigate to `public_html` folder
3. Upload all contents from `out/` folder
4. Done! No Node.js setup needed

## SSL Certificate
GoDaddy usually provides free SSL. To enable:
1. Go to "Security" → "SSL Certificates"
2. Enable for your domain
3. Force HTTPS redirect in hosting settings

## Troubleshooting

### Site Not Loading
- Check DNS propagation
- Verify Node.js is running (if using Option 2)
- Check error logs in GoDaddy panel

### 500 Errors
- Ensure all dependencies are installed
- Check Node.js version compatibility
- Review server logs

### Slow Performance
- Consider using Vercel/Netlify instead
- Enable caching in GoDaddy
- Optimize images and assets

## Support
- GoDaddy Support: 24/7 phone/chat
- Vercel Docs: vercel.com/docs
- Next.js Docs: nextjs.org/docs

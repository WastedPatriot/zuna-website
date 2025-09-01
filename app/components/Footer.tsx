'use client';

import Link from 'next/link';
import SpriteAnimation from './SpriteAnimation';

export default function Footer() {
  const footerLinks = {
    product: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/blog', label: 'Blog' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/careers', label: 'Careers' },
      { href: '/press', label: 'Press Kit' },
    ],
    resources: [
      { href: '/help', label: 'Help Center' },
      { href: '/docs', label: 'Documentation' },
      { href: '/api', label: 'API' },
      { href: '/status', label: 'System Status' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/security', label: 'Security' },
    ],
  };

  return (
    <footer className="bg-gray-900 border-t-4 border-gray-700" style={{ imageRendering: 'pixelated' }}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12">
                <SpriteAnimation
                  sprite="/sprites/idleblink.webp"
                  frames={2}
                  frameRate={500}
                  size={48}
                  alt="ZUNA Logo"
                />
              </div>
              <span className="text-2xl font-bold text-white" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.1em'
              }}>
                ZUNA
              </span>
            </div>
            <p className="text-gray-400 text-xs mb-4" style={{ fontFamily: 'monospace' }}>
              Your Financial Adventure Companion
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/zunafinance" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="https://instagram.com/zunafinance" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">📷</span>
              </a>
              <a href="https://linkedin.com/company/zuna" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">💼</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: 'monospace' }}>
                PRODUCT
              </h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-300 transition-colors text-xs"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: 'monospace' }}>
                COMPANY
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-300 transition-colors text-xs"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: 'monospace' }}>
                RESOURCES
              </h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-300 transition-colors text-xs"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: 'monospace' }}>
                LEGAL
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-300 transition-colors text-xs"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-2 border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs mb-4 md:mb-0" style={{ fontFamily: 'monospace' }}>
              © 2025 ZUNA Financial Wellness. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-yellow-300 transition-colors text-xs"
                style={{ fontFamily: 'monospace' }}
              >
                Sitemap
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-400 hover:text-yellow-300 transition-colors text-xs"
                style={{ fontFamily: 'monospace' }}
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

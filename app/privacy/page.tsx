'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import PixelBackground from '../components/PixelBackground';
import GrassyBottom from '../components/GrassyBottom';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function PrivacyPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <PixelBackground isDarkMode={isDarkMode}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center" style={{
          backgroundColor: isDarkMode ? 'rgba(0, 4, 40, 0.8)' : 'rgba(74, 144, 226, 0.9)',
          borderBottom: '4px solid',
          borderColor: isDarkMode ? '#667eea' : '#357ABD'
        }}>
          <Link href="/" className="text-white hover:text-yellow-300 transition-colors" style={{
            fontFamily: pixelFont.style.fontFamily,
            fontSize: '12px'
          }}>
            ← HOME
          </Link>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded"
            style={{
              backgroundColor: isDarkMode ? '#FFD700' : '#4A90E2',
              border: '2px solid',
              borderColor: isDarkMode ? '#FFA500' : '#357ABD',
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '10px'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div style={{
              backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
              border: '4px solid',
              borderColor: isDarkMode ? '#667eea' : '#4A90E2',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
              padding: '32px',
              imageRendering: 'pixelated'
            }}>
              <h1 className="text-center mb-8" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '24px',
                color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
              }}>
                PRIVACY POLICY
              </h1>

              <div className="space-y-6" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '12px',
                color: isDarkMode ? '#E0E0E0' : '#333333',
                lineHeight: '1.8'
              }}>
                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>1. INFORMATION WE COLLECT</h2>
                  <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• Account information (name, email, password)</li>
                    <li>• Financial information (bank connections via TrueLayer)</li>
                    <li>• Usage data (game scores, savings goals)</li>
                    <li>• Device information (for mobile app)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>2. HOW WE USE YOUR INFORMATION</h2>
                  <p>We use the information we collect to:</p>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• Provide and maintain our services</li>
                    <li>• Process transactions and savings</li>
                    <li>• Send you updates and marketing (with consent)</li>
                    <li>• Improve our services</li>
                    <li>• Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>3. DATA SECURITY</h2>
                  <p>We implement appropriate technical and organizational measures to protect your personal data. This includes:</p>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• Encryption of sensitive data</li>
                    <li>• Secure authentication via Auth0</li>
                    <li>• Regular security audits</li>
                    <li>• Limited access to personal data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>4. DATA SHARING</h2>
                  <p>We do not sell, trade, or rent your personal information. We may share your information with:</p>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• Service providers (TrueLayer, Auth0, Supabase)</li>
                    <li>• Legal authorities when required by law</li>
                    <li>• With your explicit consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>5. YOUR RIGHTS</h2>
                  <p>You have the right to:</p>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• Access your personal data</li>
                    <li>• Correct inaccurate data</li>
                    <li>• Request deletion of your data</li>
                    <li>• Withdraw consent</li>
                    <li>• Data portability</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>6. COOKIES</h2>
                  <p>We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>7. CHILDREN'S PRIVACY</h2>
                  <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>8. CONTACT US</h2>
                  <p>If you have questions about this Privacy Policy, please contact us at:</p>
                  <p className="mt-2">Email: privacy@zuna.finance</p>
                </section>

                <div className="mt-8 pt-8 border-t-2" style={{ borderColor: isDarkMode ? '#667eea' : '#4A90E2' }}>
                  <p className="text-center" style={{ fontSize: '10px' }}>
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}

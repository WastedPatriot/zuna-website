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

export default function TermsPage() {
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
                TERMS & CONDITIONS
              </h1>

              <div className="space-y-6" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '12px',
                color: isDarkMode ? '#E0E0E0' : '#333333',
                lineHeight: '1.8'
              }}>
                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>1. ACCEPTANCE OF TERMS</h2>
                  <p>By accessing and using ZUNA, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>2. USE LICENSE</h2>
                  <p>Permission is granted to temporarily download one copy of ZUNA for personal, non-commercial transitory viewing only.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>3. DISCLAIMER</h2>
                  <p>The materials on ZUNA are provided on an 'as is' basis. ZUNA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>4. LIMITATIONS</h2>
                  <p>In no event shall ZUNA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use ZUNA.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>5. PRIVACY</h2>
                  <p>Your use of ZUNA is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>6. MODIFICATIONS</h2>
                  <p>ZUNA may revise these terms of service at any time without notice. By using ZUNA, you are agreeing to be bound by the then current version of these terms of service.</p>
                </section>

                <section>
                  <h2 className="text-lg mb-3" style={{ color: '#10b981' }}>7. GOVERNING LAW</h2>
                  <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
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
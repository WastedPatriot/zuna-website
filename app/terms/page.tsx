'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import InteractiveBackground from '../components/InteractiveBackground';
import Navigation from '../components/Navigation';

export default function Terms() {
  return (
    <>
      <InteractiveBackground />
      <Navigation />
      
      <div className="relative z-10 min-h-screen px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 pixelated text-green-400">
            TERMS & CONDITIONS
          </h1>
          
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">1. ACCEPTANCE OF TERMS</h2>
              <p>By accessing and using Zuna ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">2. USE LICENSE</h2>
              <p>Permission is granted to temporarily access and use Zuna for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained in Zuna</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">3. FINANCIAL SERVICES</h2>
              <p>Zuna provides financial wellness tools and crypto wallet services. By using these services, you acknowledge that:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>You are at least 18 years old (or 13 with parental consent)</li>
                <li>You will provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>Cryptocurrency transactions are irreversible</li>
                <li>Past performance does not guarantee future results</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">4. PRIVACY & DATA</h2>
              <p>Your use of our Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">5. TAMAGOTCHI COMPANION</h2>
              <p>The Tamagotchi companion feature is provided for entertainment and engagement purposes. Virtual pet status and rewards have no monetary value and cannot be exchanged for real currency.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">6. SUBSCRIPTION SERVICES</h2>
              <p>Premium features require a monthly subscription. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. You can manage your subscription in your account settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">7. DISCLAIMER</h2>
              <p>The materials on Zuna are provided on an 'as is' basis. Zuna makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">8. LIMITATIONS</h2>
              <p>In no event shall Zuna or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Zuna, even if Zuna or a Zuna authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">9. GOVERNING LAW</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">10. CONTACT INFORMATION</h2>
              <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
              <div className="mt-2">
                <p>Email: legal@gozuna.co.uk</p>
                <p>Address: Zuna Ltd, London, United Kingdom</p>
              </div>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-bold pixelated"
              >
                I ACCEPT
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

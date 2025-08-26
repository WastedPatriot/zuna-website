import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from './components/CustomCursor';
import FeedbackWidget from './components/FeedbackWidget';
import SkyBackground from './components/SkyBackground';
import { Auth0Provider } from './providers/Auth0Provider';

export const metadata: Metadata = {
  title: 'Zuna - Your Financial Companion',
  description: 'Banking reimagined with your Tamagotchi companion. Save, play, and grow your finances.',
  keywords: 'zuna, banking, finance, tamagotchi, savings, crypto wallet',
  openGraph: {
    title: 'Zuna - Your Financial Companion',
    description: 'Banking reimagined with your Tamagotchi companion',
    url: 'https://gozuna.co.uk',
    siteName: 'Zuna',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sky-100 text-gray-800 overflow-x-hidden">
        <Auth0Provider>
          <SkyBackground />
          <CustomCursor />
          <FeedbackWidget />
          <div className="relative z-10">
            {children}
          </div>
        </Auth0Provider>
      </body>
    </html>
  );
}
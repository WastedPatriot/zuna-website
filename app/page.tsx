'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './pixel-styles.css';

export default function Home() {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const [mascotFrame, setMascotFrame] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState('');
  
  const speeches = [
    "Welcome to Zuna!",
    "Let's save money together!",
    "Banking made fun!",
    "I'm your money buddy!"
  ];

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1
    }));
    setStars(newStars);

    // Animate mascot
    const mascotInterval = setInterval(() => {
      setMascotFrame(prev => (prev + 1) % 2);
    }, 500);

    // Show speech bubbles
    const speechInterval = setInterval(() => {
      const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
      setSpeechText(randomSpeech);
      setShowSpeech(true);
      setTimeout(() => setShowSpeech(false), 3000);
    }, 5000);

    return () => {
      clearInterval(mascotInterval);
      clearInterval(speechInterval);
    };
  }, []);

  return (
    <main className="pixel-container">
      {/* Animated Galaxy Background */}
      <div className="galaxy-background">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="pixel-nav">
        <div className="nav-content">
          <Link href="/" className="logo pixel-text">
            ZUNA
          </Link>
          <div className="nav-links">
            <Link href="#features" className="nav-link pixel-text">FEATURES</Link>
            <Link href="#download" className="nav-link pixel-text">DOWNLOAD</Link>
            <Link href="https://app.gozuna.co.uk" className="nav-button pixel-text">
              LAUNCH APP
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title pixel-text">ZUNA</h1>
          <p className="hero-subtitle pixel-text">FINANCIAL WELLNESS MEETS PIXEL FUN</p>
          
          {/* Pixel Mascot */}
          <div className="mascot-container">
            <div className="pixel-mascot">
              {/* Mascot Head */}
              <div className="mascot-row">
                <div className="pixel transparent"></div>
                <div className="pixel gray"></div>
                <div className="pixel gray"></div>
                <div className="pixel transparent"></div>
              </div>
              <div className="mascot-row">
                <div className="pixel gray"></div>
                <div className="pixel green"></div>
                <div className="pixel green"></div>
                <div className="pixel gray"></div>
              </div>
              <div className="mascot-row">
                <div className="pixel green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel green"></div>
              </div>
              <div className="mascot-row">
                <div className="pixel green"></div>
                <div className="pixel pink"></div>
                <div className="pixel pink"></div>
                <div className="pixel green"></div>
              </div>
              <div className="mascot-row">
                <div className="pixel gray"></div>
                <div className="pixel green"></div>
                <div className="pixel green"></div>
                <div className="pixel gray"></div>
              </div>
              {/* Body */}
              <div className="mascot-row">
                <div className="pixel transparent"></div>
                <div className="pixel green"></div>
                <div className="pixel green"></div>
                <div className="pixel transparent"></div>
              </div>
              <div className="mascot-row">
                <div className="pixel green"></div>
                <div className="pixel green-light"></div>
                <div className="pixel green-light"></div>
                <div className="pixel green"></div>
              </div>
              <div className="mascot-row">
                <div className="pixel gray"></div>
                <div className="pixel green"></div>
                <div className="pixel green"></div>
                <div className="pixel gray"></div>
              </div>
            </div>
            
            {/* Speech Bubble */}
            {showSpeech && (
              <div className="speech-bubble pixel-text">
                {speechText}
              </div>
            )}
          </div>

          <div className="hero-buttons">
            <Link href="#download" className="pixel-button primary">
              DOWNLOAD NOW
            </Link>
            <Link href="#features" className="pixel-button secondary">
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title pixel-text">FEATURES</h2>
        
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              <div className="pixel-icon-mascot"></div>
            </div>
            <h3 className="feature-title pixel-text">TAMAGOTCHI COMPANION</h3>
            <p className="feature-description pixel-text">
              Your own financial pet that grows with your savings
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">
              <div className="pixel-icon-game"></div>
            </div>
            <h3 className="feature-title pixel-text">TETRIS GAME</h3>
            <p className="feature-description pixel-text">
              Play endless Tetris and compete on leaderboards
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">
              <div className="pixel-icon-ai"></div>
            </div>
            <h3 className="feature-title pixel-text">AI MONEY COACH</h3>
            <p className="feature-description pixel-text">
              Get personalized financial advice from our AI
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon">
              <div className="pixel-icon-crypto"></div>
            </div>
            <h3 className="feature-title pixel-text">CRYPTO WALLET</h3>
            <p className="feature-description pixel-text">
              Secure crypto storage with Face ID protection
            </p>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="download-section">
        <div className="download-content">
          <h2 className="section-title pixel-text">START YOUR JOURNEY</h2>
          <p className="download-subtitle pixel-text">
            Join thousands saving money the fun way
          </p>
          
          <div className="download-buttons">
            <a href="https://apps.apple.com/zuna" className="download-button ios">
              <span className="pixel-text">DOWNLOAD FOR IOS</span>
            </a>
            <a href="https://play.google.com/store/apps/zuna" className="download-button android">
              <span className="pixel-text">DOWNLOAD FOR ANDROID</span>
            </a>
          </div>

          <div className="stats-container">
            <div className="stat">
              <div className="stat-number pixel-text">10K+</div>
              <div className="stat-label pixel-text">USERS</div>
            </div>
            <div className="stat">
              <div className="stat-number pixel-text">4.8★</div>
              <div className="stat-label pixel-text">RATING</div>
            </div>
            <div className="stat">
              <div className="stat-number pixel-text">£1M+</div>
              <div className="stat-label pixel-text">SAVED</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pixel-footer">
        <div className="footer-content">
          <div className="footer-logo pixel-text">ZUNA</div>
          <div className="footer-links">
            <Link href="/privacy" className="footer-link pixel-text">PRIVACY</Link>
            <Link href="/terms" className="footer-link pixel-text">TERMS</Link>
            <Link href="/support" className="footer-link pixel-text">SUPPORT</Link>
          </div>
          <div className="footer-copyright pixel-text">
            © 2024 ZUNA. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}
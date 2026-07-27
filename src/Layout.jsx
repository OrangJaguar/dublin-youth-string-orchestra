import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import GlassHeader from './components/navigation/GlassHeader';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

export default function Layout({ children }) {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data[0] || { banner_enabled: true };
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        
        :root {
          --color-void: #0a0a0a;
          --color-surface: #1c1c1c;
          --color-text-primary: #ededed;
          --color-text-secondary: #a1a1a1;
          --color-accent-emerald: #2e8b57;
          --color-accent-gold: #FFD700;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--color-void);
          color: var(--color-text-primary);
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--color-void);
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--color-surface);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
        
        /* Gold pulse animation for RAs */
        @keyframes goldPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(255, 215, 0, 0);
          }
        }
        
        .ra-pulse {
          animation: goldPulse 2s infinite;
        }
      `}</style>

      <ScrollToTop />
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <GlassHeader />
      </div>
      
      <main>
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Mail, FileText, MessageSquare } from 'lucide-react';

export default function Footer() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data[0] || {
        remind_code: '@25DYSO',
        contact_email: 'info@dyso.org'
      };
    },
  });

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1c1c1c] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f197e26113f0f983a7a02/f6b20e4fd_DysoLogoWhite.png"
                alt="DYSO Logo"
                className="h-16 w-auto mb-3"
              />
              <p className="text-[#a1a1a1] text-sm">Dublin Youth String Orchestra</p>
            </div>
            <p className="text-[#a1a1a1] text-sm max-w-sm leading-relaxed">
              Nurturing the next generation of exceptional string musicians through 
              rigorous training, inspiring performances, and a commitment to excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#ededed] font-medium mb-4 tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {['Home', 'Schedule', 'Members', 'Listen', 'Audition', 'Contact'].map((page) => (
                <Link
                  key={page}
                  to={createPageUrl(page)}
                  className="text-[#a1a1a1] hover:text-[#2e8b57] text-sm transition-colors"
                >
                  {page}
                </Link>
              ))}
              <a
                href="https://docs.google.com/document/d/1JP0X-KvndTF-7LwtMFEmkxnkf0PV6bn36YtvnTxcZOM/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a1a1a1] hover:text-[#2e8b57] text-sm transition-colors inline-flex items-center gap-2"
              >
                <FileText className="w-3 h-3" />
                DYSO Handbook
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#ededed] font-medium mb-4 tracking-wide">Connect</h4>
            <div className="space-y-4">
              <a 
                href={`mailto:${settings?.contact_email || 'info@dyso.org'}`} 
                className="inline-flex items-center gap-2 text-[#a1a1a1] hover:text-[#2e8b57] text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                {settings?.contact_email || 'info@dyso.org'}
              </a>
              <div className="flex items-start gap-2 text-[#a1a1a1] text-sm">
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[#ededed] font-medium mb-1">Remind</div>
                  <div className="text-xs">Text <span className="font-mono bg-[#1c1c1c] px-2 py-0.5 rounded">{settings?.remind_code || '@25DYSO'}</span> to <span className="font-mono bg-[#1c1c1c] px-2 py-0.5 rounded">81010</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1c1c1c] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a1a1a1] text-sm">
            © {new Date().getFullYear()} Dublin Youth String Orchestra. All rights reserved.
          </p>
          <p className="text-[#a1a1a1] text-xs">
            Crafted With Passion for Music by Sanskar Gupta
          </p>
        </div>
      </div>
    </footer>
  );
}
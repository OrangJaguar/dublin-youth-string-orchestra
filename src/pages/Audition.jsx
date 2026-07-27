import React from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ScrollReveal from '../components/animations/ScrollReveal';
import FAQSection from '../components/getinvolved/FAQSection';
import { Music, Users, ArrowRight, CheckCircle2, XCircle, Calendar, Clock, MapPin } from 'lucide-react';

export default function Audition() {
  const { data: settings = {} } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data[0] || {
        applications_open: false,
        application_deadline: 'Fall 2026',
        audition_date: 'TBA',
        audition_date_display: 'Wednesday, May 27',
        audition_time: '4PM–6PM',
        audition_location: 'Karrer Middle School Music Wing',
        orchestra_application_link: '#',
        ra_application_link: '#',
        orchestra_eligibility: '• String players (violin, viola, cello, bass)\n• Ages 12-18\n• Intermediate to advanced skill level\n• Commitment to weekly rehearsals',
        orchestra_requirements: '• Prepare one solo piece (2-3 minutes)\n• Sight-reading assessment\n• Scale demonstration\n• Brief interview',
        ra_responsibilities: '• Assist conductors during rehearsals\n• Help with music distribution\n• Support section leaders\n• Mentor younger musicians'
      };
    },
  });

  const eligibilityItems = settings?.orchestra_eligibility?.split('\n').filter(item => item.trim()) || [];
  const auditionRequirements = settings?.orchestra_requirements?.split('\n').filter(item => item.trim()) || [];
  const raResponsibilities = settings?.ra_responsibilities?.split('\n').filter(item => item.trim()) || [];

  const auditionDateDisplay = settings?.audition_date_display || 'Wednesday, May 27';
  const auditionTime = settings?.audition_time || '4PM–6PM';
  const auditionLocation = settings?.audition_location || 'Karrer Middle School Music Wing';

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Fixed */}
        <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-12 pt-24 lg:pt-24 bg-gradient-to-br from-[#0a0a0a] to-[#1c1c1c]">
          <div className="max-w-md w-full">
            <ScrollReveal>
              <span className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase block mb-4">
                Auditions
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#ededed] italic leading-tight">
                Take Your Seat.
              </h1>
              <p className="text-[#a1a1a1] mt-6 text-lg leading-relaxed">
                Join Dublin's premier youth string orchestra and become part of a tradition of musical excellence.
              </p>
            </ScrollReveal>

            {/* Audition Info Card */}
            <ScrollReveal delay={0.2}>
              <div className="mt-10 bg-[#161616] border border-[#2e8b57]/40 rounded-2xl p-6 space-y-4">
                <p className="text-[#2e8b57] text-xs tracking-[0.25em] uppercase font-semibold mb-5">Next Audition</p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2e8b57]/15 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[#2e8b57]" />
                  </div>
                  <div>
                    <p className="text-[#a1a1a1] text-xs uppercase tracking-widest">Date</p>
                    <p className="text-[#ededed] font-semibold text-base">{auditionDateDisplay}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2e8b57]/15 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#2e8b57]" />
                  </div>
                  <div>
                    <p className="text-[#a1a1a1] text-xs uppercase tracking-widest">Time</p>
                    <p className="text-[#ededed] font-semibold text-base">{auditionTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2e8b57]/15 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#2e8b57]" />
                  </div>
                  <div>
                    <p className="text-[#a1a1a1] text-xs uppercase tracking-widest">Location</p>
                    <p className="text-[#ededed] font-semibold text-base">{auditionLocation}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>


          </div>
        </div>

        {/* Right Side - Scrollable */}
        <div className="p-8 md:p-12 lg:p-16 pt-24 lg:pt-24 space-y-12">

          {/* Orchestra Membership Card */}
          <ScrollReveal>
            <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-[#1f1f1f] border-b border-white/5 p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2e8b57]/20 flex items-center justify-center">
                      <Music className="w-6 h-6 text-[#2e8b57]" />
                    </div>
                    <div>
                      <h2 className="text-[#ededed] text-2xl font-semibold">Orchestra Member Auditions</h2>
                      <p className="text-[#a1a1a1] text-sm">For students in grades 5–9</p>
                    </div>
                  </div>
                  {settings?.applications_open ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#2e8b57]/20 border border-[#2e8b57] rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-[#2e8b57]" />
                      <span className="text-[#2e8b57] font-medium text-sm">Applications Open</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#666]/20 border border-[#666] rounded-lg">
                      <XCircle className="w-4 h-4 text-[#888]" />
                      <span className="text-[#888] font-medium text-sm">Applications Closed</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                {/* How to Apply */}
                <h3 className="text-[#ededed] text-lg font-semibold text-center mb-8">How to Apply</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { num: 1, title: "Review Requirements", desc: "Check eligibility and audition materials" },
                    { num: 2, title: "Prepare Your Audition", desc: "Practice your scales and prepared piece" },
                    { num: 3, title: "Apply Online", desc: "Submit your application and schedule audition" }
                  ].map((step) => (
                    <div key={step.num} className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-[#2e8b57] text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">
                        {step.num}
                      </div>
                      <h4 className="text-[#ededed] font-medium text-sm mb-1">{step.title}</h4>
                      <p className="text-[#a1a1a1] text-xs">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 mb-8 text-[#a1a1a1]">
                  <ArrowRight className="w-5 h-5" />
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Eligibility & Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-[#ededed] font-semibold mb-4">Eligibility</h4>
                    <ul className="space-y-3">
                      {eligibilityItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#a1a1a1] text-sm">
                          <div className="w-2 h-2 rounded-full bg-[#2e8b57] mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#ededed] font-semibold mb-4">Audition Requirements</h4>
                    <ul className="space-y-3">
                      {auditionRequirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#a1a1a1] text-sm">
                          <div className="w-2 h-2 rounded-full bg-[#2e8b57] mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {settings?.applications_open ? (
                  <a
                    href={settings.orchestra_application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#2e8b57] hover:bg-[#256f46] text-white py-4 rounded-xl font-medium transition-colors text-center"
                  >
                    Apply for DYSO Membership
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full bg-[#333] text-[#888] py-4 rounded-xl font-medium cursor-not-allowed"
                  >
                    Applications Currently Closed
                  </button>
                )}
                <p className="text-center text-[#a1a1a1] text-sm mt-3">
                  {settings?.applications_open
                    ? `Application deadline: ${settings.audition_date}`
                    : `Application deadline has passed`}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* RA Program Card */}
          <ScrollReveal delay={0.2}>
            <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-[#1f1f1f] border-b border-[#FFD700]/20 p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div>
                      <h2 className="text-[#FFD700] text-2xl font-semibold">Rehearsal Assistant Applications</h2>
                      <p className="text-[#a1a1a1] text-sm">For high school students in grades 10–12</p>
                    </div>
                  </div>
                  {settings?.applications_open ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700] rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-[#FFD700] font-medium text-sm">Applications Open</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#666]/20 border border-[#666] rounded-lg">
                      <XCircle className="w-4 h-4 text-[#888]" />
                      <span className="text-[#888] font-medium text-sm">Applications Closed</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                <p className="text-[#a1a1a1] mb-6 leading-relaxed">
                  Are you a high school string player looking to develop leadership skills and give back to the
                  music community? Our Rehearsal Assistant (RA) program offers a unique mentorship opportunity
                  for experienced musicians to support younger students while continuing to grow as performers
                  themselves.
                </p>

                <h4 className="text-[#ededed] font-semibold mb-4">RA Responsibilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {raResponsibilities.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-[#a1a1a1] text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#FFD700] mt-1.5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                {settings?.applications_open ? (
                  <a
                    href={settings.ra_application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-transparent border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 py-4 rounded-xl font-medium transition-colors text-center"
                  >
                    Apply to be an RA
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full bg-transparent border border-[#666] text-[#888] py-4 rounded-xl font-medium cursor-not-allowed"
                  >
                    Applications Currently Closed
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ Section */}
          <FAQSection />
        </div>
      </div>
    </div>
  );
}
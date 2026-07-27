import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

const faqs = [
  {
    id: 1,
    question: "What is the time commitment?",
    answer: "DYSO rehearses weekly on Thursday evenings during the school year, from September through May. Members are also expected to attend all scheduled concerts (typically 2-3 per year). Additional sectional rehearsals may be scheduled before major performances."
  },
  {
    id: 2,
    question: "When and where are rehearsals?",
    answer: "Rehearsals are held every Thursday evening from 6:30 PM to 8:30 PM at Sells Middle School in Dublin, Ohio. The orchestra room provides excellent acoustics and ample space for our full ensemble."
  },
  {
    id: 3,
    question: "Is there a tuition fee?",
    answer: "Yes, there is an annual tuition fee to cover music, facility costs, and operational expenses. Financial assistance is available for families who qualify. Please contact us for current tuition rates and scholarship information."
  },
  {
    id: 4,
    question: "What instruments does DYSO accept?",
    answer: "DYSO accepts violin, viola, cello, and double bass players. We are a string orchestra, so we do not include wind, brass, or percussion instruments. All string players who meet the audition requirements are welcome to apply."
  },
  {
    id: 5,
    question: "What level of playing ability is required?",
    answer: "We accept students in grades 5-9 who have at least 1-2 years of playing experience on their instrument. Students should be able to read music, play scales, and perform intermediate-level repertoire. The audition helps us assess readiness for ensemble playing."
  }
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="bg-[#161616] border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-white/5 transition-colors"
      >
        <span className="text-[#ededed] text-base font-medium pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#a1a1a1]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[#a1a1a1] px-6 pb-5 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <ScrollReveal>
      <div className="mt-16">
        <h2 className="text-[#ededed] text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openFaq === faq.id}
              onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
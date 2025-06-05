import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I purchase game credits?',
    answer: 'You can purchase credits directly through our platform. Simply select your desired package, complete the secure payment process, and credits will be instantly added to your account.'
  },
  {
    question: 'What are the minimum purchase quantities?',
    answer: 'Our starter package begins at 25,000 credits. For larger volumes or custom quantities, please contact our sales team for special pricing and terms.'
  },
  {
    question: 'How quickly are credits delivered?',
    answer: 'Credits are delivered instantly after payment confirmation. Our automated system ensures immediate availability for your gameroom operations.'
  },
  {
    question: 'Do you offer volume discounts?',
    answer: 'Yes, we offer significant discounts for bulk purchases. The larger the volume, the better the rate. Enterprise packages receive our best rates and additional bonus credits.'
  },
  {
    question: 'How do I manage multiple locations?',
    answer: 'Our platform supports multi-location management with a centralized dashboard. You can allocate credits, track usage, and manage settings for each location separately.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, wire transfers, and ACH payments for business accounts. Custom payment terms are available for qualified enterprise clients.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="py-16 md:py-24" id="faq">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Frequently Asked <span className="text-primary-600">Questions</span>
          </h2>
          <p className="text-white/70">
            Find answers to common questions about our credit distribution system and business services. For specific inquiries, contact our business support team.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto divide-y divide-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                <div className="flex-shrink-0 ml-2">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-white/70">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/70 mb-4">Have more questions about our business services?</p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold transition duration-200"
          >
            Contact Sales Team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
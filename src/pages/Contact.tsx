import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { photographerInfo } from '@/data/photographer';

/**
 * Contact page with embedded Calendly scheduling widget
 */
export default function Contact() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Contact"
        description={`Book a meeting with ${photographerInfo.name}. Schedule a 30-minute call to discuss your project.`}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 md:py-28 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                Book a Meeting
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                Schedule a time that works for you
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calendly Embed */}
        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/yuqingchen02/30min"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}

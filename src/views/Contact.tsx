'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, Loader2 } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { photographerInfo } from '@/data/photographer';
import { useTheme } from 'next-themes';

/**
 * Contact page with embedded Calendly scheduling widget
 */
export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const calendlyUrl = isDark
    ? 'https://calendly.com/yuqingchen02/30min?hide_gdpr_banner=1&background_color=0a0a0f&text_color=fafafa&primary_color=fafafa'
    : 'https://calendly.com/yuqingchen02/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=1a1a1a';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      setTimeout(() => setIsLoaded(true), 800);
    };
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
        {/* Compact Hero */}
        <section className="pt-16 pb-10 md:pt-24 md:pb-14 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="size-4" />
                <span className="text-sm font-light tracking-widest uppercase">
                  Schedule
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
                Let's Connect
              </h1>
              <p className="text-lg text-muted-foreground font-light tracking-wide max-w-xl">
                Book a 30-minute call to chat about product, AI, collaborations, or just say hello.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calendly + Contact Info */}
        <section className="px-6 lg:px-8 pb-16">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
            {/* Calendly Widget */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-lg overflow-hidden border border-border bg-card"
            >
              {/* Loading State */}
              {!isLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card">
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  <p className="text-sm text-muted-foreground font-light">
                    Loading calendar...
                  </p>
                </div>
              )}

              <div
                className="calendly-inline-widget"
                data-url={calendlyUrl}
                style={{ minWidth: '280px', height: '680px' }}
              />
            </motion.div>

            {/* Contact Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8 lg:pt-4"
            >
              {/* Quick Contact */}
              <div className="space-y-5">
                <h2 className="text-sm font-light tracking-widest uppercase text-muted-foreground">
                  Or reach out directly
                </h2>

                <a
                  href={`mailto:${photographerInfo.email}`}
                  className="group flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                >
                  <Mail className="size-4 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div>
                    <p className="text-xs text-muted-foreground font-light tracking-wide mb-1">
                      Email
                    </p>
                    <p className="text-sm font-light">
                      {photographerInfo.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                  <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground font-light tracking-wide mb-1">
                      Based in
                    </p>
                    <p className="text-sm font-light">
                      {photographerInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability Note */}
              <div className="p-4 rounded-lg bg-accent/50 border border-border">
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {photographerInfo.availability}. I typically respond within 24 hours.
                </p>
              </div>
            </motion.aside>
          </div>
        </section>
      </div>
    </>
  );
}

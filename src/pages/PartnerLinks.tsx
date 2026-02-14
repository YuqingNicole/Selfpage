import { partnerLinks } from '@/data/github-repos';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function PartnerLinks() {
  return (
    <>
      <SEOHead
        title="Partner Links"
        description="Friends and partners I recommend."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                Partner Links
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                Friends and partners I recommend
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {partnerLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partnerLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="group flex items-start gap-4 p-6 rounded-lg border border-border bg-card hover:border-foreground/20 transition-colors"
                  >
                    <img src={`https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=32`} alt="" className="size-5 rounded-sm mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium tracking-wide">{link.name}</span>
                        <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{link.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground font-light">Coming soon...</p>
            )}
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}

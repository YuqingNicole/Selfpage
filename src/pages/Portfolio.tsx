import { projects } from '@/data/projects';
import { githubRepos, useCases } from '@/data/github-repos';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Code } from 'lucide-react';

/**
 * Skills page — projects, GitHub repos, and use cases
 */
export default function Portfolio() {
  return (
    <>
      <SEOHead 
        title="Skills"
        description="Explore my projects, GitHub repositories, and real-world use cases across product, engineering, and design."
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
                Skills
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                Projects, repositories, and use cases
              </p>
            </motion.div>
          </div>
        </section>

        {/* GitHub Repos Section */}
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-light tracking-wide mb-8"
            >
              GitHub Repositories
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {githubRepos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="group block p-6 rounded-lg border border-border bg-card hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Code className="size-4" />
                      <span className="font-medium tracking-wide">{repo.name}</span>
                    </div>
                    <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="size-2.5 rounded-full bg-primary/60" />
                      {repo.language}
                    </span>
                    {repo.stars !== undefined && (
                      <span className="flex items-center gap-1">
                        <Star className="size-3" />
                        {repo.stars}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-light tracking-wide mb-8"
            >
              Use Cases
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <h3 className="text-lg font-medium tracking-wide mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                    {uc.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {uc.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12 md:py-16 px-2 md:px-4">
          <div className="max-w-6xl mx-auto px-4 lg:px-4 mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-light tracking-wide"
            >
              Projects
            </motion.h2>
          </div>
          <PortfolioGrid projects={projects} />
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}

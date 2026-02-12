import { useState } from 'react';
import { Mail, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

/**
 * Fixed bottom newsletter bar with magnetic hover and smooth morph
 */
export function NewsletterBar() {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Subscribed! Welcome aboard 🎉');
    setEmail('');
    setExpanded(false);
    setDismissed(true);
    setLoading(false);
  };

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 80, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: 2, type: 'spring' as const, stiffness: 100, damping: 15 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.div
            key="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 18 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
            >
              <Button
                onClick={() => setExpanded(true)}
                className="gap-2 rounded-full px-6 py-5 shadow-lg font-light tracking-wide bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-flex"
                >
                  <Mail className="size-4" />
                </motion.span>
                Subscribe to Newsletter
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
            onSubmit={handleSubmit}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 shadow-lg',
              'bg-background border border-border backdrop-blur-lg'
            )}
          >
            <Mail className="size-4 text-muted-foreground shrink-0" />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 w-48 text-sm placeholder:text-muted-foreground"
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                type="submit"
                size="icon"
                disabled={loading}
                className="rounded-full size-8 shrink-0"
              >
                <Send className="size-3.5" />
              </Button>
            </motion.div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="size-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

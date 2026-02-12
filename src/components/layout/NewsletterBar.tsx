import { useState } from 'react';
import { Mail, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

/**
 * Fixed bottom newsletter subscribe bar
 * Shows a compact button that expands into an email input
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
    // Simulate subscribe — replace with real endpoint later
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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.div
            key="button"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={() => setExpanded(true)}
              className="gap-2 rounded-full px-6 py-5 shadow-lg font-light tracking-wide bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Mail className="size-4" />
              Subscribe to Newsletter
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ scale: 0.9, opacity: 0, width: 200 }}
            animate={{ scale: 1, opacity: 1, width: 'auto' }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
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
            <Button
              type="submit"
              size="icon"
              disabled={loading}
              className="rounded-full size-8 shrink-0"
            >
              <Send className="size-3.5" />
            </Button>
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

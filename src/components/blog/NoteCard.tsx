import { motion } from 'framer-motion';
import { ExternalLink, Heart, Repeat2, MessageCircle } from 'lucide-react';
import type { SubstackNote } from '@/hooks/useSubstackContent';
import { staggerChildVariants } from '@/components/ui/ScrollReveal';

interface NoteCardProps {
  note: SubstackNote;
}

export function NoteCard({ note }: NoteCardProps) {
  const formattedDate = note.note_date
    ? new Date(note.note_date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  return (
    <motion.article
      variants={staggerChildVariants}
      className="group py-5 border-b border-border last:border-0"
    >
      <div className="flex gap-3">
        {/* Author avatar */}
        <img
          src="https://substackcdn.com/image/fetch/w_80,h_80,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F481e7d79-a645-405a-84c3-a4897160d3f3_474x474.jpeg"
          alt="Nicole"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
        />
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header */}
          <div
            className="flex items-center gap-2"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}
          >
            <span className="font-medium text-foreground">Nicole</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{formattedDate}</span>
          </div>

          {/* Body */}
          <p className="text-sm leading-[1.75] text-foreground/85 whitespace-pre-wrap">
            {note.body_text}
          </p>

          {/* Footer: stats + link */}
          <div
            className="flex items-center gap-4 pt-0.5"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted-foreground)' }}
          >
            {note.reaction_count > 0 && (
              <span className="flex items-center gap-1">
                <Heart className="size-3" />
                {note.reaction_count}
              </span>
            )}
            {note.restacks > 0 && (
              <span className="flex items-center gap-1">
                <Repeat2 className="size-3" />
                {note.restacks}
              </span>
            )}
            {note.comment_count > 0 && (
              <span className="flex items-center gap-1">
                <MessageCircle className="size-3" />
                {note.comment_count}
              </span>
            )}
            {note.canonical_url && (
              <a
                href={note.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Substack
                <ExternalLink className="size-2.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

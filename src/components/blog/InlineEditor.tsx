import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InlineEditorProps {
  value: string;
  onSave: (value: string) => void;
  isEditing: boolean;
  as?: 'h1' | 'h2' | 'p' | 'span' | 'textarea';
  className?: string;
  multiline?: boolean;
}

export function InlineEditor({
  value,
  onSave,
  isEditing,
  as: Tag = 'p',
  className,
  multiline = false,
}: InlineEditorProps) {
  const [localValue, setLocalValue] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  if (!isEditing) {
    if (Tag === 'textarea') {
      return <p className={className}>{value}</p>;
    }
    return <Tag className={className}>{value}</Tag>;
  }

  if (multiline || Tag === 'textarea') {
    return (
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => onSave(localValue)}
        className={cn(
          className,
          'w-full bg-transparent border border-dashed border-primary/40 rounded px-2 py-1 focus:outline-none focus:border-primary resize-y min-h-[120px]'
        )}
        rows={8}
      />
    );
  }

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const text = (e.target as HTMLElement).textContent || '';
        onSave(text);
      }}
      className={cn(
        className,
        'border border-dashed border-primary/40 rounded px-1 focus:outline-none focus:border-primary cursor-text'
      )}
    >
      {value}
    </Tag>
  );
}

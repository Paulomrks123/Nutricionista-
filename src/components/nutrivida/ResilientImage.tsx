import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  onClick?: () => void;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  onClick,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-card via-muted to-background p-6 text-center ${className}`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/10 bg-muted/70 text-primary">
          <ImageOff className="h-5 w-5" aria-hidden="true" />
        </div>
        {fallbackTitle && (
          <p className="max-w-xs text-sm font-medium text-foreground/80">{fallbackTitle}</p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      onClick={onClick}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

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
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#141822] via-[#111827] to-[#090b10] p-6 text-center ${className}`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1f2937]/70 text-[#d4af37]">
          <ImageOff className="h-5 w-5" aria-hidden="true" />
        </div>
        {fallbackTitle && (
          <p className="max-w-xs text-sm font-medium text-[#f3f4f6]/80">{fallbackTitle}</p>
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
    />
  );
}

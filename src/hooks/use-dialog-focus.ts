import { useEffect } from 'react';

export function useDialogFocus(open: boolean, label: string) {
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const getDialog = () => Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"]')).find(el => el.getAttribute('aria-label') === label || el.getAttribute('aria-labelledby') === label);
    const focusable = () => Array.from(getDialog()?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]') ?? []).filter(el => !el.hasAttribute('disabled'));
    const frame = requestAnimationFrame(() => focusable()[0]?.focus({ preventScroll: true }));
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) return;
      if (!getDialog()?.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', trap);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('keydown', trap); document.body.style.overflow = previousOverflow; if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true }); };
  }, [open, label]);
}

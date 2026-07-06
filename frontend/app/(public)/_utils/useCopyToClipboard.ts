import { useState, useRef, useCallback } from 'react';

type CopyStatus = 'idle' | 'success' | 'error';

export const useCopyToClipboard = (
  resetDelay = 3000
): [CopyStatus, string | null, (text: string) => Promise<void>] => {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string): Promise<void> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      setStatus('error');
      setCopiedText(null);
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setStatus('success');
        setCopiedText(text);
      } catch (error) {
        setStatus('error');
        setCopiedText(null);
      }
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus('idle');
      setCopiedText(null);
    }, resetDelay);
  }, [resetDelay]);

  return [status, copiedText, copy];
};
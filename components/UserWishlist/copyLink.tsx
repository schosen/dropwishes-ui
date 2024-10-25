'use client';

import { useState } from 'react';

interface CopyLinkProps {
  link: string;
}

export default function CopyLink({ link }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <button onClick={handleCopy}>Copy Link</button>
      {copied && <p>Link copied!</p>}
    </div>
  );
}

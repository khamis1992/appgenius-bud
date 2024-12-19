import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-slate-900 text-slate-50">
      <ScrollArea className="h-full">
        <pre className="p-4 font-mono text-sm">
          <code>{code || 'Generated code will appear here...'}</code>
        </pre>
      </ScrollArea>
    </div>
  );
};

export default CodePreview;
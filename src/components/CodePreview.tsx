import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  return (
    <div className="code-editor overflow-hidden rounded-lg">
      <ScrollArea className="h-full">
        <pre className="p-4">
          <code>{code || 'Generated code will appear here...'}</code>
        </pre>
      </ScrollArea>
    </div>
  );
};

export default CodePreview;
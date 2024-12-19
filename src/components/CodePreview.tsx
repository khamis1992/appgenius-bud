import React from 'react';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  return (
    <div className="code-editor overflow-auto">
      <pre>
        <code>{code || 'Generated code will appear here...'}</code>
      </pre>
    </div>
  );
};

export default CodePreview;
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  isProcessing: boolean;
}

const CommandInput = ({ onSubmit, isProcessing }: CommandInputProps) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && !isProcessing) {
      onSubmit(command);
      setCommand('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        className="min-h-[200px] resize-none p-4 font-mono text-sm bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:ring-[#0066cc] dark:focus:ring-[#10b981]"
        placeholder="Describe your application in natural language..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={isProcessing}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isProcessing || !command.trim()}
          className="px-6 bg-gradient-to-r from-[#0066cc] to-[#10b981] hover:from-[#0052a3] hover:to-[#0e9268] text-white"
        >
          <Send className="w-4 h-4 mr-2" />
          Generate
        </Button>
      </div>
    </form>
  );
};

export default CommandInput;
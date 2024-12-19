import React, { useState } from 'react';
import { Send } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        className="command-input resize-none min-h-[100px]"
        placeholder="Describe your application in natural language..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={isProcessing}
      />
      <button
        type="submit"
        disabled={isProcessing || !command.trim()}
        className="absolute bottom-4 right-4 p-2 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default CommandInput;
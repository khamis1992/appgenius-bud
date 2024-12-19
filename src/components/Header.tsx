import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header = ({ onOpenSettings }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border/50">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Offline AI Builder</h1>
        <span className="px-2 py-1 text-xs bg-secondary rounded-full">Beta</span>
      </div>
      <button
        onClick={onOpenSettings}
        className="p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
    </header>
  );
};

export default Header;
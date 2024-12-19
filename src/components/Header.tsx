import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header = ({ onOpenSettings }: HeaderProps) => {
  return (
    <header className="border-b border-slate-200/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/5">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#0066cc] to-[#10b981] bg-clip-text text-transparent">
            Offline AI Builder
          </h1>
          <Badge variant="secondary" className="bg-[#10b981] text-white">Beta</Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          className="h-9 w-9 hover:bg-slate-200/10"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header = ({ onOpenSettings }: HeaderProps) => {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Offline AI Builder</h1>
          <Badge variant="secondary">Beta</Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          className="h-9 w-9"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
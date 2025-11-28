import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-[1000] border-b border-border bg-background/80 shadow backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
            L
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-foreground">Hanghae Company</h1>
            <p className="mt-[2px] text-[11px] leading-none text-muted-foreground">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info + Theme Toggle */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
            className="text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <div className="text-right">
            <div className="text-sm font-semibold text-foreground">Demo User</div>
            <div className="text-xs text-muted-foreground">demo@example.com</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};

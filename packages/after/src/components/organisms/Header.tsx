import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            L
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none text-foreground">
              Hanghae Company
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground leading-none">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-semibold text-foreground">
              Demo User
            </div>
            <div className="text-xs text-muted-foreground">
              demo@example.com
            </div>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              DU
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

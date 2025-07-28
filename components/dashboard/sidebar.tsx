"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Sparkles,
  Scissors,
  Brush,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  MessageSquare,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agendamentos', href: '/appointments', icon: Calendar },
  { name: 'Clientes', href: '/clients', icon: Users },
  { name: 'Serviços', href: '/services', icon: Package },
  { name: 'Profissionais', href: '/professionals', icon: User },
  { name: 'Horários', href: '/schedule', icon: Clock },
  { name: 'Financeiro', href: '/finance', icon: CreditCard },
  { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  { name: 'Mensagens', href: '/messages', icon: MessageSquare },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-card/95 backdrop-blur-sm border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="p-1.5 rounded-lg bg-accent/10">
                <Scissors className="h-5 w-5 text-accent" />
              </div>
              <div className="p-1.5 rounded-lg bg-secondary/10">
                <Brush className="h-5 w-5 text-secondary" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BelleHub
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && (
              <div className="text-xs text-muted-foreground">
                BelleHub v1.0
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
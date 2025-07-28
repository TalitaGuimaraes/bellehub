"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Calendar, Users, CreditCard, BarChart3, Package } from 'lucide-react';

const actions = [
  {
    title: 'Novo Agendamento',
    description: 'Agendar cliente',
    icon: Calendar,
    color: 'bg-blue-500 hover:bg-blue-600',
    href: '/appointments'
  },
  {
    title: 'Cadastrar Cliente',
    description: 'Adicionar novo cliente',
    icon: Users,
    color: 'bg-green-500 hover:bg-green-600',
    href: '/clients'
  },
  {
    title: 'Registrar Venda',
    description: 'Lançar pagamento',
    icon: CreditCard,
    color: 'bg-purple-500 hover:bg-purple-600',
    href: '/finance'
  },
  {
    title: 'Novo Serviço',
    description: 'Cadastrar serviço',
    icon: Package,
    color: 'bg-orange-500 hover:bg-orange-600',
    href: '/services'
  },
  {
    title: 'Ver Relatórios',
    description: 'Análises e métricas',
    icon: BarChart3,
    color: 'bg-indigo-500 hover:bg-indigo-600',
    href: '/reports'
  }
];

export function QuickActions() {
  return (
    <Card className="beauty-shadow border-0">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>
          Acesso rápido às funcionalidades principais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
            >
              <Button
                variant="outline"
                className="h-auto p-4 justify-start hover:bg-muted/50 transition-all duration-200 w-full"
              >
                <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
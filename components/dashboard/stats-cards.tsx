"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, DollarSign, Users, Clock } from 'lucide-react';

const stats = [
  {
    title: 'Receita Hoje',
    value: 'R$ 1.240',
    description: '+12% em relação a ontem',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Agendamentos',
    value: '18',
    description: '8 hoje, 10 amanhã',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Clientes Ativos',
    value: '142',
    description: '+8 novos esta semana',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    title: 'Taxa de Ocupação',
    value: '87%',
    description: 'Acima da média mensal',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  }
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="beauty-shadow border-0 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
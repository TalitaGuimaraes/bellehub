"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, CreditCard, UserPlus, Scissors } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'appointment',
    title: 'Agendamento confirmado',
    description: 'Maria Silva - Corte + Escova',
    time: '2 min atrás',
    icon: CalendarCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Pagamento recebido',
    description: 'R$ 150,00 - PIX',
    time: '15 min atrás',
    icon: CreditCard,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 3,
    type: 'client',
    title: 'Novo cliente cadastrado',
    description: 'Ana Costa - Primeira visita',
    time: '1 hora atrás',
    icon: UserPlus,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 4,
    type: 'service',
    title: 'Serviço finalizado',
    description: 'Juliana Santos - Manicure',
    time: '2 horas atrás',
    icon: Scissors,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  }
];

export function RecentActivity() {
  return (
    <Card className="beauty-shadow border-0">
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>
          Últimas atividades do seu negócio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Phone, MessageSquare } from 'lucide-react';

const appointments = [
  {
    id: 1,
    client: {
      name: 'Maria Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      phone: '(11) 99999-1111'
    },
    service: 'Corte + Escova',
    time: '14:00',
    duration: '1h 30min',
    status: 'confirmed',
    price: 'R$ 120'
  },
  {
    id: 2,
    client: {
      name: 'Ana Costa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
      phone: '(11) 88888-2222'
    },
    service: 'Manicure + Pedicure',
    time: '15:30',
    duration: '2h',
    status: 'pending',
    price: 'R$ 80'
  },
  {
    id: 3,
    client: {
      name: 'Juliana Santos',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juliana',
      phone: '(11) 77777-3333'
    },
    service: 'Alongamento de Cílios',
    time: '16:00',
    duration: '2h 30min',
    status: 'confirmed',
    price: 'R$ 200'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Confirmado</Badge>;
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pendente</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export function UpcomingAppointments() {
  return (
    <Card className="beauty-shadow border-0">
      <CardHeader>
        <CardTitle>Próximos Agendamentos</CardTitle>
        <CardDescription>
          Agendamentos para hoje
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={appointment.client.avatar} alt={appointment.client.name} />
                  <AvatarFallback>
                    {appointment.client.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {appointment.client.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.service}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{appointment.time} ({appointment.duration})</span>
                    </div>
                    <span className="font-medium text-foreground">{appointment.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(appointment.status)}
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
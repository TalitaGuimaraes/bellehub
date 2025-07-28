"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cake, Gift, MessageSquare, Phone } from 'lucide-react';

const birthdayClients = [
  {
    id: 1,
    name: 'Maria Silva',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    phone: '(11) 99999-1111',
    birthday: '2024-01-22',
    dayOfWeek: 'Segunda',
    age: 32,
    lastVisit: '2024-01-15',
    preferredService: 'Corte + Escova'
  },
  {
    id: 2,
    name: 'Ana Costa',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    phone: '(11) 88888-2222',
    birthday: '2024-01-24',
    dayOfWeek: 'Quarta',
    age: 28,
    lastVisit: '2024-01-10',
    preferredService: 'Manicure'
  },
  {
    id: 3,
    name: 'Carla Oliveira',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carla',
    phone: '(11) 66666-4444',
    birthday: '2024-01-26',
    dayOfWeek: 'Sexta',
    age: 35,
    lastVisit: '2023-12-20',
    preferredService: 'Coloração'
  }
];

const formatBirthday = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short' 
  });
};

const getDaysUntilBirthday = (birthdayString: string) => {
  const today = new Date();
  const birthday = new Date(birthdayString);
  const diffTime = birthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanhã';
  if (diffDays < 0) return 'Passou';
  return `${diffDays} dias`;
};

const getBirthdayBadgeColor = (birthdayString: string) => {
  const daysUntil = getDaysUntilBirthday(birthdayString);
  if (daysUntil === 'Hoje') return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  if (daysUntil === 'Amanhã') return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
  return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
};

export function BirthdayClients() {
  const handleSendBirthdayMessage = (client: typeof birthdayClients[0]) => {
    const message = `🎉 Parabéns, ${client.name}! Desejamos um feliz aniversário! 🎂 Que tal comemorar com um ${client.preferredService}? Entre em contato conosco! 💄✨`;
    const whatsappUrl = `https://wa.me/${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="beauty-shadow border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Cake className="h-5 w-5 text-pink-600" />
          <span>Aniversariantes da Semana</span>
        </CardTitle>
        <CardDescription>
          Clientes que fazem aniversário nos próximos 7 dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        {birthdayClients.length > 0 ? (
          <div className="space-y-4">
            {birthdayClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.avatar} alt={client.name} />
                      <AvatarFallback>
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <Cake className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium leading-none">
                        {client.name}
                      </p>
                      <Badge variant="secondary" className={getBirthdayBadgeColor(client.birthday)}>
                        {getDaysUntilBirthday(client.birthday)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatBirthday(client.birthday)} • {client.dayOfWeek}</span>
                      <span>{client.age} anos</span>
                      <span>Prefere: {client.preferredService}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSendBirthdayMessage(client)}
                    className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                  >
                    <Gift className="h-3 w-3 mr-1" />
                    Parabenizar
                  </Button>
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
        ) : (
          <div className="text-center py-8">
            <Cake className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum aniversariante</h3>
            <p className="text-muted-foreground">
              Não há clientes fazendo aniversário esta semana.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
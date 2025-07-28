"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import Link from 'next/link';
import { Calendar, Plus, Search, Filter, Clock, Phone, MessageSquare, MapPin, Edit, Trash2 } from 'lucide-react';

const mockAppointments = [
  {
    id: 1,
    client: {
      name: 'Maria Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      phone: '(11) 99999-1111'
    },
    service: 'Corte + Escova',
    date: '2024-01-20',
    time: '14:00',
    duration: '1h 30min',
    status: 'confirmed',
    price: 'R$ 120',
    notes: 'Cliente prefere corte mais curto'
  },
  {
    id: 2,
    client: {
      name: 'Ana Costa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
      phone: '(11) 88888-2222'
    },
    service: 'Manicure + Pedicure',
    date: '2024-01-20',
    time: '15:30',
    duration: '2h',
    status: 'pending',
    price: 'R$ 80',
    notes: 'Primeira vez no salão'
  },
  {
    id: 3,
    client: {
      name: 'Juliana Santos',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juliana',
      phone: '(11) 77777-3333'
    },
    service: 'Alongamento de Cílios',
    date: '2024-01-20',
    time: '16:00',
    duration: '2h 30min',
    status: 'confirmed',
    price: 'R$ 200',
    notes: 'Volume russo'
  },
  {
    id: 4,
    client: {
      name: 'Carla Oliveira',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carla',
      phone: '(11) 66666-4444'
    },
    service: 'Coloração + Corte',
    date: '2024-01-21',
    time: '09:00',
    duration: '3h',
    status: 'confirmed',
    price: 'R$ 280',
    notes: 'Quer loiro platinado'
  },
  {
    id: 5,
    client: {
      name: 'Fernanda Lima',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fernanda',
      phone: '(11) 55555-5555'
    },
    service: 'Sobrancelha + Design',
    date: '2024-01-21',
    time: '10:30',
    duration: '45min',
    status: 'cancelled',
    price: 'R$ 45',
    notes: 'Cancelado pela cliente'
  },
  {
    id: 6,
    client: {
      name: 'Patricia Rocha',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia',
      phone: '(11) 44444-6666'
    },
    service: 'Massagem Relaxante',
    date: '2024-01-21',
    time: '14:00',
    duration: '1h',
    status: 'confirmed',
    price: 'R$ 150',
    notes: 'Dores nas costas'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Confirmado</Badge>;
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pendente</Badge>;
    case 'cancelled':
      return <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Cancelado</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Concluído</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    weekday: 'short', 
    day: '2-digit', 
    month: 'short' 
  });
};

export default function AppointmentsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    const matchesDate = selectedDate === 'all' || appointment.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const todayAppointments = mockAppointments.filter(apt => apt.date === '2024-01-20');
  const tomorrowAppointments = mockAppointments.filter(apt => apt.date === '2024-01-21');

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
              <p className="text-muted-foreground">
                Gerencie todos os seus agendamentos e horários
              </p>
            </div>
            <Link href="/appointments/new">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{todayAppointments.length}</div>
                <p className="text-sm text-muted-foreground">Hoje</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">{tomorrowAppointments.length}</div>
                <p className="text-sm text-muted-foreground">Amanhã</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mockAppointments.filter(apt => apt.status === 'confirmed').length}
                </div>
                <p className="text-sm text-muted-foreground">Confirmados</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {mockAppointments.filter(apt => apt.status === 'pending').length}
                </div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="beauty-shadow border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente ou serviço..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">Todas as datas</option>
                    <option value="2024-01-20">Hoje</option>
                    <option value="2024-01-21">Amanhã</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">Todos os status</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="pending">Pendente</option>
                    <option value="cancelled">Cancelado</option>
                    <option value="completed">Concluído</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map((appointment, index) => (
              <Card key={appointment.id} className="beauty-shadow border-0 hover:shadow-lg transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.client.avatar} alt={appointment.client.name} />
                        <AvatarFallback>
                          {appointment.client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{appointment.client.name}</h3>
                        <p className="text-muted-foreground">{appointment.service}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{appointment.time} ({appointment.duration})</span>
                          </div>
                          <span className="font-medium text-green-600">{appointment.price}</span>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground italic">
                            "{appointment.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(appointment.status)}
                      <div className="flex space-x-1">
                        <Link href={`tel:${appointment.client.phone}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href="/messages">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/appointments/edit/${appointment.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:text-red-700" 
                          onClick={() => {
                            if (confirm('Tem certeza que deseja excluir este agendamento?')) {
                              // Here you would typically call an API to delete the appointment
                              console.log('Excluindo agendamento', appointment.id);
                              // For now, just show a success message
                              alert('Agendamento excluído com sucesso!');
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <Card className="beauty-shadow border-0">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum agendamento encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Não há agendamentos que correspondam aos filtros selecionados.
                </p>
                <Link href="/appointments/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Novo Agendamento
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
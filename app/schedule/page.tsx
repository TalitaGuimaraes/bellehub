"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { Calendar, Clock, Plus, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
];

const mockSchedule = {
  '2024-01-20': {
    '09:00': { client: 'Maria Silva', service: 'Corte + Escova', duration: '1h 30min', status: 'confirmed' },
    '14:00': { client: 'Ana Costa', service: 'Manicure', duration: '1h', status: 'confirmed' },
    '16:00': { client: 'Juliana Santos', service: 'Alongamento de Cílios', duration: '2h 30min', status: 'pending' }
  },
  '2024-01-21': {
    '10:00': { client: 'Carla Oliveira', service: 'Coloração', duration: '3h', status: 'confirmed' },
    '15:00': { client: 'Patricia Rocha', service: 'Massagem', duration: '1h', status: 'confirmed' }
  }
};

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export default function SchedulePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'day' | 'week'>('day');

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

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (selectedView === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const currentDateString = formatDate(currentDate);
  const todaySchedule = mockSchedule[currentDateString as keyof typeof mockSchedule] || {};

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Horários</h1>
              <p className="text-muted-foreground">
                Gerencie sua agenda e horários de atendimento
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setSelectedView(selectedView === 'day' ? 'week' : 'day')}>
                {selectedView === 'day' ? 'Visão Semanal' : 'Visão Diária'}
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
              <Link href="/schedule/new">
                <Plus className="h-4 w-4 mr-2" />
                Novo Horário
              </Link>
              </Button>
            </div>
          </div>

          {/* Date Navigation */}
          <Card className="beauty-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={() => navigateDate('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">
                    {selectedView === 'day' ? formatDisplayDate(currentDate) : 'Semana'}
                  </h2>
                  {selectedView === 'week' && (
                    <p className="text-sm text-muted-foreground">
                      {getWeekDates()[0].toLocaleDateString('pt-BR')} - {getWeekDates()[6].toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
                <Button variant="outline" size="icon" onClick={() => navigateDate('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Schedule View */}
          {selectedView === 'day' ? (
            <Card className="beauty-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Agenda do Dia</span>
                </CardTitle>
                <CardDescription>
                  Horários disponíveis e agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {timeSlots.map((time) => {
                    const appointment = todaySchedule[time];
                    return (
                      <div
                        key={time}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                          appointment
                            ? 'border-primary/20 bg-primary/5'
                            : 'border-dashed border-gray-300 hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{time}</span>
                          </div>
                          {appointment && (
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                            </Badge>
                          )}
                        </div>
                        {appointment ? (
                          <div className="space-y-1">
                            <p className="font-semibold text-sm">{appointment.client}</p>
                            <p className="text-sm text-muted-foreground">{appointment.service}</p>
                            <p className="text-xs text-muted-foreground">{appointment.duration}</p>
                          </div>
                        ) : (
                          <div className="text-center py-2">
                            <p className="text-sm text-muted-foreground">Disponível</p>
                            <Button variant="ghost" size="sm" className="mt-1" onClick={() => console.log('Agendar horário', time)}>
                              <Plus className="h-3 w-3 mr-1" />
                              Agendar
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="beauty-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Visão Semanal</span>
                </CardTitle>
                <CardDescription>
                  Agenda da semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {getWeekDates().map((date, index) => {
                    const dateString = formatDate(date);
                    const daySchedule = mockSchedule[dateString as keyof typeof mockSchedule] || {};
                    const appointmentCount = Object.keys(daySchedule).length;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="text-center">
                          <p className="text-sm font-medium">{weekDays[date.getDay()]}</p>
                          <p className="text-lg font-bold">{date.getDate()}</p>
                        </div>
                        <div className="space-y-1">
                          {appointmentCount > 0 ? (
                            <div className="bg-primary/10 rounded-lg p-2 text-center">
                              <p className="text-sm font-medium text-primary">
                                {appointmentCount} agendamento{appointmentCount > 1 ? 's' : ''}
                              </p>
                            </div>
                          ) : (
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
                              <p className="text-sm text-muted-foreground">Livre</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <p className="text-sm text-muted-foreground">Agendamentos Hoje</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">6</div>
                <p className="text-sm text-muted-foreground">Confirmados</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">87%</div>
                <p className="text-sm text-muted-foreground">Taxa de Ocupação</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
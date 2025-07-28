"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ArrowLeft, Calendar, Clock, User, Settings } from 'lucide-react';
import Link from 'next/link';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
];

const mockClients = [
  { id: '1', name: 'Maria Silva' },
  { id: '2', name: 'Ana Costa' },
  { id: '3', name: 'Juliana Santos' },
  { id: '4', name: 'Carla Oliveira' },
  { id: '5', name: 'Patricia Rocha' }
];

const mockServices = [
  { id: '1', name: 'Corte + Escova', duration: '1h 30min', price: 'R$ 80,00' },
  { id: '2', name: 'Manicure', duration: '1h', price: 'R$ 35,00' },
  { id: '3', name: 'Alongamento de Cílios', duration: '2h 30min', price: 'R$ 150,00' },
  { id: '4', name: 'Coloração', duration: '3h', price: 'R$ 200,00' },
  { id: '5', name: 'Massagem', duration: '1h', price: 'R$ 120,00' }
];

export default function NewSchedulePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    client: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    status: 'confirmed'
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo horário criado:', formData);
    router.push('/schedule');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/schedule">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Novo Horário</h1>
                <p className="text-muted-foreground">
                  Agende um novo horário para seu cliente
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            <Card className="beauty-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Informações do Agendamento</span>
                </CardTitle>
                <CardDescription>
                  Preencha os dados para criar um novo horário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="client" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Cliente</span>
                      </Label>
                      <Select value={formData.client} onValueChange={(value) => handleInputChange('client', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockClients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Serviço</span>
                      </Label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockServices.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - {service.duration} - {service.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Data</span>
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Horário</span>
                      </Label>
                      <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmado</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        placeholder="Observações adicionais sobre o agendamento..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                    <Link href="/schedule">
                      <Button variant="outline">
                        Cancelar
                      </Button>
                    </Link>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      Criar Horário
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
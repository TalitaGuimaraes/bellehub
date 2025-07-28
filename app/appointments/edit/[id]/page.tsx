"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ArrowLeft, Save, Calendar, Clock, User, Package } from 'lucide-react';
import Link from 'next/link';

const mockClients = [
  { id: 1, name: 'Maria Silva', phone: '(11) 99999-1111' },
  { id: 2, name: 'Ana Costa', phone: '(11) 88888-2222' },
  { id: 3, name: 'Juliana Santos', phone: '(11) 77777-3333' },
  { id: 4, name: 'Carla Oliveira', phone: '(11) 66666-4444' },
  { id: 5, name: 'Patricia Rocha', phone: '(11) 44444-6666' }
];

const mockServices = [
  { id: 1, name: 'Corte + Escova', duration: '1h 30min', price: 'R$ 120' },
  { id: 2, name: 'Manicure + Pedicure', duration: '2h', price: 'R$ 80' },
  { id: 3, name: 'Alongamento de Cílios', duration: '2h 30min', price: 'R$ 200' },
  { id: 4, name: 'Coloração + Corte', duration: '3h', price: 'R$ 280' },
  { id: 5, name: 'Massagem Relaxante', duration: '1h', price: 'R$ 150' }
];

const mockAppointments = [
  {
    id: 1,
    clientId: 1,
    serviceId: 1,
    date: '2024-01-20',
    time: '14:00',
    status: 'confirmed',
    notes: 'Cliente prefere corte mais curto'
  },
  {
    id: 2,
    clientId: 2,
    serviceId: 2,
    date: '2024-01-20',
    time: '15:30',
    status: 'pending',
    notes: 'Primeira vez no salão'
  },
  {
    id: 3,
    clientId: 3,
    serviceId: 3,
    date: '2024-01-20',
    time: '16:00',
    status: 'confirmed',
    notes: 'Volume russo'
  }
];

export default function EditAppointmentPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const appointmentId = parseInt(params.id as string);
  
  const [formData, setFormData] = useState({
    clientId: '',
    serviceId: '',
    date: '',
    time: '',
    status: '',
    notes: ''
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Load appointment data
    const appointment = mockAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setFormData({
        clientId: appointment.clientId.toString(),
        serviceId: appointment.serviceId.toString(),
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        notes: appointment.notes
      });
    }
  }, [appointmentId]);

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Editando agendamento:', appointmentId, formData);
    // Here you would typically update the appointment
    router.push('/appointments');
  };

  const selectedClient = mockClients.find(client => client.id.toString() === formData.clientId);
  const selectedService = mockServices.find(service => service.id.toString() === formData.serviceId);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/appointments">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Editar Agendamento</h1>
                <p className="text-muted-foreground">
                  Edite os dados do agendamento #{appointmentId}
                </p>

                <div className="space-y-2">
                  <Label htmlFor="professional" className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <span>Profissional</span>
                  </Label>
                  <Select value={formData.professionalId} onValueChange={(value) => handleInputChange('professionalId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProfessionals.map((professional) => (
                        <SelectItem key={professional.id} value={professional.id.toString()}>
                          {professional.name} - {professional.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  Atualize os dados do agendamento
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
                      <Select value={formData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockClients.map((client) => (
                            <SelectItem key={client.id} value={client.id.toString()}>
                              {client.name} - {client.phone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <span>Serviço</span>
                      </Label>
                      <Select value={formData.serviceId} onValueChange={(value) => handleInputChange('serviceId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockServices.map((service) => (
                            <SelectItem key={service.id} value={service.id.toString()}>
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
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        required
                      />
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
                          <SelectItem value="completed">Concluído</SelectItem>
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
                    <Link href="/appointments">
                      <Button variant="outline">
                        Cancelar
                      </Button>
                    </Link>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
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
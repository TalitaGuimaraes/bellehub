"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ArrowLeft, Save, Calendar, Clock, User, Package, Plus } from 'lucide-react';
import Link from 'next/link';

const mockClients = [
  { id: 1, name: 'Maria Silva', phone: '(11) 99999-1111' },
  { id: 2, name: 'Ana Costa', phone: '(11) 88888-2222' },
  { id: 3, name: 'Juliana Santos', phone: '(11) 77777-3333' },
];

const mockServices = [
  { id: 1, name: 'Corte Feminino', duration: '45 min', price: 'R$ 80' },
  { id: 2, name: 'Escova Progressiva', duration: '3h', price: 'R$ 280' },
  { id: 3, name: 'Manicure Completa', duration: '1h', price: 'R$ 45' },
];

const mockProfessionals = [
  { id: 1, name: 'Ana Silva', specialty: 'Cabelo e Coloração' },
  { id: 2, name: 'Carlos Santos', specialty: 'Barbearia' },
  { id: 3, name: 'Maria Costa', specialty: 'Unhas e Estética' },
  { id: 4, name: 'Julia Oliveira', specialty: 'Cílios e Sobrancelhas' },
];

export default function NewAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientId: '',
    serviceId: '',
    professionalId: '',
    date: '',
    time: '',
    notes: ''
  });
  const [newClientData, setNewClientData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clients, setClients] = useState(mockClients);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNewClientChange = (field: string, value: string) => {
    setNewClientData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateClient = () => {
    if (newClientData.name && newClientData.phone) {
      const newClient = {
        id: clients.length + 1,
        name: newClientData.name,
        phone: newClientData.phone
      };
      setClients(prev => [...prev, newClient]);
      setFormData(prev => ({ ...prev, clientId: newClient.id.toString() }));
      setNewClientData({ name: '', phone: '', email: '', birthday: '' });
      setIsDialogOpen(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Criando agendamento:', formData);
    // Aqui você salvaria no backend
    router.push('/appointments');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Link href="/appointments">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Novo Agendamento</h1>
              <p className="text-muted-foreground">
                Crie um novo agendamento para seu cliente
              </p>
            </div>
          </div>

          <Card className="beauty-shadow border-0 max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Informações do Agendamento</span>
              </CardTitle>
              <CardDescription>
                Preencha os dados do novo agendamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Select value={formData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name} - {client.phone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-2">
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                            <Plus className="h-4 w-4 mr-2" />
                            Cadastrar Novo Cliente
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Novo Cliente</DialogTitle>
                            <DialogDescription>
                              Cadastre um novo cliente rapidamente
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="newClientName">Nome Completo *</Label>
                              <Input
                                id="newClientName"
                                value={newClientData.name}
                                onChange={(e) => handleNewClientChange('name', e.target.value)}
                                placeholder="Nome do cliente"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newClientPhone">Telefone *</Label>
                              <Input
                                id="newClientPhone"
                                value={newClientData.phone}
                                onChange={(e) => handleNewClientChange('phone', e.target.value)}
                                placeholder="(11) 99999-9999"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newClientEmail">Email</Label>
                              <Input
                                id="newClientEmail"
                                type="email"
                                value={newClientData.email}
                                onChange={(e) => handleNewClientChange('email', e.target.value)}
                                placeholder="email@exemplo.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newClientBirthday">Data de Nascimento</Label>
                              <Input
                                id="newClientBirthday"
                                type="date"
                                value={newClientData.birthday}
                                onChange={(e) => handleNewClientChange('birthday', e.target.value)}
                              />
                            </div>
                            <div className="flex space-x-2 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="flex-1"
                              >
                                Cancelar
                              </Button>
                              <Button
                                type="button"
                                onClick={handleCreateClient}
                                disabled={!newClientData.name || !newClientData.phone}
                                className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Criar Cliente
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Serviço</Label>
                    <Select value={formData.serviceId} onValueChange={(value) => handleInputChange('serviceId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
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
                    <Label htmlFor="professional">Profissional</Label>
                    <Select value={formData.professionalId} onValueChange={(value) => handleInputChange('professionalId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
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

                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Observações sobre o agendamento..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Link href="/appointments" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Agendamento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
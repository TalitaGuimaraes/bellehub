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
import { Checkbox } from '@/components/ui/checkbox';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ArrowLeft, Save, User, Percent } from 'lucide-react';
import Link from 'next/link';

const availableServices = [
  'Corte Feminino',
  'Corte Masculino',
  'Coloração',
  'Escova Progressiva',
  'Manicure',
  'Pedicure',
  'Alongamento de Cílios',
  'Design de Sobrancelhas',
  'Barba',
  'Bigode',
  'Massagem Relaxante',
  'Drenagem Linfática',
  'Limpeza de Pele',
  'Maquiagem Social'
];

const specialties = [
  'Cabelo e Coloração',
  'Barbearia',
  'Unhas e Estética',
  'Cílios e Sobrancelhas',
  'Massagem e Bem-estar',
  'Maquiagem',
  'Depilação',
  'Estética Facial'
];

const mockProfessionals = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana@beautypro.com',
    phone: '(11) 99999-1111',
    birthDate: '1990-05-15',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    specialty: 'Cabelo e Coloração',
    commissionRate: 40,
    hireDate: '2023-01-15',
    status: 'active',
    notes: 'Especialista em coloração',
    services: ['Corte Feminino', 'Coloração', 'Escova Progressiva']
  },
  {
    id: 2,
    name: 'Carlos Santos',
    email: 'carlos@bellehub.com',
    phone: '(11) 88888-2222',
    birthDate: '1985-08-20',
    address: 'Av. Principal, 456',
    city: 'São Paulo',
    specialty: 'Barbearia',
    commissionRate: 35,
    hireDate: '2023-03-20',
    status: 'active',
    notes: 'Barbeiro experiente',
    services: ['Corte Masculino', 'Barba', 'Bigode']
  }
];

export default function EditProfessionalPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const professionalId = parseInt(params.id as string);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    specialty: '',
    commissionRate: '',
    hireDate: '',
    status: 'active',
    notes: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Carregar dados do profissional
    const professional = mockProfessionals.find(prof => prof.id === professionalId);
    if (professional) {
      setFormData({
        name: professional.name,
        email: professional.email,
        phone: professional.phone,
        birthDate: professional.birthDate,
        address: professional.address,
        city: professional.city,
        specialty: professional.specialty,
        commissionRate: professional.commissionRate.toString(),
        hireDate: professional.hireDate,
        status: professional.status,
        notes: professional.notes
      });
      setSelectedServices(professional.services);
    }
  }, [professionalId]);

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

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Editando profissional:', professionalId, { ...formData, services: selectedServices });
    // Aqui você salvaria no backend
    router.push('/professionals');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Link href="/professionals">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Editar Profissional</h1>
              <p className="text-muted-foreground">
                Edite os dados do profissional #{professionalId}
              </p>
            </div>
          </div>

          <div className="max-w-4xl">
            <Card className="beauty-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Informações do Profissional</span>
                </CardTitle>
                <CardDescription>
                  Atualize os dados do profissional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Nome do profissional"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="email@exemplo.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Rua, número"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Cidade"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dados Profissionais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Dados Profissionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Especialidade *</Label>
                        <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a especialidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="commissionRate" className="flex items-center space-x-2">
                          <Percent className="h-4 w-4" />
                          <span>Taxa de Comissão (%) *</span>
                        </Label>
                        <Input
                          id="commissionRate"
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={formData.commissionRate}
                          onChange={(e) => handleInputChange('commissionRate', e.target.value)}
                          placeholder="Ex: 40"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hireDate">Data de Contratação *</Label>
                        <Input
                          id="hireDate"
                          type="date"
                          value={formData.hireDate}
                          onChange={(e) => handleInputChange('hireDate', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                            <SelectItem value="vacation">Férias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Serviços */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Serviços que Realiza</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {availableServices.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={selectedServices.includes(service)}
                            onCheckedChange={() => handleServiceToggle(service)}
                          />
                          <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Observações */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      placeholder="Observações sobre o profissional..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Link href="/professionals" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Cancelar
                      </Button>
                    </Link>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
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
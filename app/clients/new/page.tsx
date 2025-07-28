"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ArrowLeft, Save, User, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function NewClientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    notes: '',
    preferredServices: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Criando cliente:', formData);
    // Aqui você salvaria no backend
    router.push('/clients');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Link href="/clients">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Novo Cliente</h1>
              <p className="text-muted-foreground">
                Cadastre um novo cliente
              </p>
            </div>
          </div>

          <Card className="beauty-shadow border-0 max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informações do Cliente</span>
              </CardTitle>
              <CardDescription>
                Preencha os dados do novo cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome do cliente"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@exemplo.com"
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

                <div className="space-y-2">
                  <Label htmlFor="preferredServices">Serviços Preferidos</Label>
                  <Input
                    id="preferredServices"
                    value={formData.preferredServices}
                    onChange={(e) => handleInputChange('preferredServices', e.target.value)}
                    placeholder="Ex: Corte, Escova, Manicure"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Observações sobre o cliente..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Link href="/clients" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Cliente
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
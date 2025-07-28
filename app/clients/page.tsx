"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { Search, Plus, Phone, Mail, Calendar, MoreVertical } from 'lucide-react';

const mockClients = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-1111',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    lastVisit: '2024-01-15',
    totalVisits: 12,
    totalSpent: 'R$ 1.450',
    status: 'active',
    preferredServices: ['Corte', 'Escova']
  },
  {
    id: 2,
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 88888-2222',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    lastVisit: '2024-01-10',
    totalVisits: 8,
    totalSpent: 'R$ 980',
    status: 'active',
    preferredServices: ['Manicure', 'Pedicure']
  },
  {
    id: 3,
    name: 'Juliana Santos',
    email: 'juliana@email.com',
    phone: '(11) 77777-3333',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juliana',
    lastVisit: '2024-01-08',
    totalVisits: 15,
    totalSpent: 'R$ 2.100',
    status: 'vip',
    preferredServices: ['Alongamento de Cílios']
  },
  {
    id: 4,
    name: 'Carla Oliveira',
    email: 'carla@email.com',
    phone: '(11) 66666-4444',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carla',
    lastVisit: '2023-12-20',
    totalVisits: 3,
    totalSpent: 'R$ 320',
    status: 'inactive',
    preferredServices: ['Corte']
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Ativo</Badge>;
    case 'vip':
      return <Badge variant="default" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">VIP</Badge>;
    case 'inactive':
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Inativo</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export default function ClientsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filteredClients = mockClients.filter(client => {
    if (selectedFilter === 'all') return true;
    return client.status === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
              <p className="text-muted-foreground">
                Gerencie seus clientes e histórico de atendimentos
              </p>
            </div>
            <Link href="/clients/new">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Cliente
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <Card className="beauty-shadow border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar clientes por nome, email ou telefone..."
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedFilter('all')}
                  >
                    Todos
                  </Button>
                  <Button 
                    variant={selectedFilter === 'active' ? 'default' : 'outline'}
                    onClick={() => setSelectedFilter('active')}
                  >
                    Ativos
                  </Button>
                  <Button 
                    variant={selectedFilter === 'vip' ? 'default' : 'outline'}
                    onClick={() => setSelectedFilter('vip')}
                  >
                    VIP
                  </Button>
                  <Button 
                    variant={selectedFilter === 'inactive' ? 'default' : 'outline'}
                    onClick={() => setSelectedFilter('inactive')}
                  >
                    Inativos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <Card key={client.id} className="beauty-shadow border-0 hover:shadow-lg transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>{client.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(client.status)}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Gasto</p>
                      <p className="font-semibold text-green-600">{client.totalSpent}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Visitas</p>
                      <p className="font-semibold">{client.totalVisits}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Serviços Preferidos</p>
                    <div className="flex flex-wrap gap-1">
                      {client.preferredServices.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Última visita: {new Date(client.lastVisit).toLocaleDateString('pt-BR')}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Link href={`tel:${client.phone}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="h-3 w-3 mr-1" />
                        Ligar
                      </Button>
                    </Link>
                    <Link href={`mailto:${client.email}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                    </Link>
                    <Link href="/appointments" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Calendar className="h-3 w-3 mr-1" />
                        Agendar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{filteredClients.length}</div>
                <p className="text-sm text-muted-foreground">Total de Clientes</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mockClients.filter(c => c.status === 'active').length}
                </div>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {mockClients.filter(c => c.status === 'vip').length}
                </div>
                <p className="text-sm text-muted-foreground">Clientes VIP</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">
                  R$ {mockClients.reduce((total, client) => {
                    const value = parseFloat(client.totalSpent.replace('R$ ', '').replace('.', ''));
                    return total + value;
                  }, 0).toLocaleString('pt-BR')}
                </div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
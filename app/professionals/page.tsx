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
import { Search, Plus, Edit, Trash2, User, Percent, Phone, Mail, Calendar, MoreVertical } from 'lucide-react';

const mockProfessionals = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana@beautypro.com',
    phone: '(11) 99999-1111',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    specialty: 'Cabelo e Coloração',
    commissionRate: 40,
    status: 'active',
    hireDate: '2023-01-15',
    totalServices: 245,
    monthlyRevenue: 'R$ 8.500',
    services: ['Corte Feminino', 'Coloração', 'Escova Progressiva']
  },
  {
    id: 2,
    name: 'Carlos Santos',
    email: 'carlos@beautypro.com',
    phone: '(11) 88888-2222',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    specialty: 'Barbearia',
    commissionRate: 35,
    status: 'active',
    hireDate: '2023-03-20',
    totalServices: 189,
    monthlyRevenue: 'R$ 6.200',
    services: ['Corte Masculino', 'Barba', 'Bigode']
  },
  {
    id: 3,
    name: 'Maria Costa',
    email: 'maria@beautypro.com',
    phone: '(11) 77777-3333',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    specialty: 'Unhas e Estética',
    commissionRate: 45,
    status: 'active',
    hireDate: '2022-11-10',
    totalServices: 312,
    monthlyRevenue: 'R$ 9.800',
    services: ['Manicure', 'Pedicure', 'Alongamento de Unhas']
  },
  {
    id: 4,
    name: 'Julia Oliveira',
    email: 'julia@beautypro.com',
    phone: '(11) 66666-4444',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=julia',
    specialty: 'Cílios e Sobrancelhas',
    commissionRate: 50,
    status: 'active',
    hireDate: '2023-06-05',
    totalServices: 156,
    monthlyRevenue: 'R$ 7.200',
    services: ['Alongamento de Cílios', 'Design de Sobrancelhas']
  },
  {
    id: 5,
    name: 'Pedro Lima',
    email: 'pedro@bellehub.com',
    phone: '(11) 55555-5555',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
    specialty: 'Massagem e Bem-estar',
    commissionRate: 30,
    status: 'inactive',
    hireDate: '2023-02-28',
    totalServices: 89,
    monthlyRevenue: 'R$ 3.400',
    services: ['Massagem Relaxante', 'Drenagem Linfática']
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Ativo</Badge>;
    case 'inactive':
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Inativo</Badge>;
    case 'vacation':
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Férias</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const getCommissionColor = (rate: number) => {
  if (rate >= 45) return 'text-green-600';
  if (rate >= 35) return 'text-yellow-600';
  return 'text-red-600';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  });
};

export default function ProfessionalsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
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

  const filteredProfessionals = mockProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || professional.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditProfessional = (professionalId: number) => {
    router.push(`/professionals/edit/${professionalId}`);
  };

  const handleDeleteProfessional = (professionalId: number, professionalName: string) => {
    if (confirm(`Tem certeza que deseja excluir o profissional "${professionalName}"?`)) {
      console.log('Excluindo profissional:', professionalId);
      alert('Profissional excluído com sucesso!');
    }
  };

  const totalProfessionals = mockProfessionals.length;
  const activeProfessionals = mockProfessionals.filter(p => p.status === 'active').length;
  const averageCommission = mockProfessionals.reduce((sum, p) => sum + p.commissionRate, 0) / totalProfessionals;
  const totalMonthlyRevenue = mockProfessionals.reduce((total, professional) => {
    const value = parseFloat(professional.monthlyRevenue.replace('R$ ', '').replace('.', ''));
    return total + value;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profissionais</h1>
              <p className="text-muted-foreground">
                Gerencie sua equipe de profissionais e comissões
              </p>
            </div>
            <Link href="/professionals/new">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Profissional
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{totalProfessionals}</div>
                <p className="text-sm text-muted-foreground">Total de Profissionais</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{activeProfessionals}</div>
                <p className="text-sm text-muted-foreground">Profissionais Ativos</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">{averageCommission.toFixed(1)}%</div>
                <p className="text-sm text-muted-foreground">Comissão Média</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  R$ {totalMonthlyRevenue.toLocaleString('pt-BR')}
                </div>
                <p className="text-sm text-muted-foreground">Receita Mensal Total</p>
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
                    placeholder="Buscar profissionais por nome ou especialidade..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedStatus('all')}
                  >
                    Todos
                  </Button>
                  <Button 
                    variant={selectedStatus === 'active' ? 'default' : 'outline'}
                    onClick={() => setSelectedStatus('active')}
                  >
                    Ativos
                  </Button>
                  <Button 
                    variant={selectedStatus === 'inactive' ? 'default' : 'outline'}
                    onClick={() => setSelectedStatus('inactive')}
                  >
                    Inativos
                  </Button>
                  <Button 
                    variant={selectedStatus === 'vacation' ? 'default' : 'outline'}
                    onClick={() => setSelectedStatus('vacation')}
                  >
                    Férias
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional, index) => (
              <Card key={professional.id} className="beauty-shadow border-0 hover:shadow-lg transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={professional.avatar} alt={professional.name} />
                        <AvatarFallback>
                          {professional.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{professional.name}</CardTitle>
                        <CardDescription>{professional.specialty}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(professional.status)}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Comissão</p>
                      <div className="flex items-center space-x-1">
                        <Percent className="h-3 w-3" />
                        <p className={`font-semibold text-lg ${getCommissionColor(professional.commissionRate)}`}>
                          {professional.commissionRate}%
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Receita Mensal</p>
                      <p className="font-semibold text-green-600">{professional.monthlyRevenue}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Serviços Realizados</p>
                      <p className="font-semibold">{professional.totalServices}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contratado em</p>
                      <p className="font-semibold">{formatDate(professional.hireDate)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Especialidades</p>
                    <div className="flex flex-wrap gap-1">
                      {professional.services.slice(0, 2).map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {professional.services.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{professional.services.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex space-x-2">
                      <Link href={`tel:${professional.phone}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`mailto:${professional.email}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditProfessional(professional.id)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-red-600 hover:text-red-700" 
                      onClick={() => handleDeleteProfessional(professional.id, professional.name)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <Card className="beauty-shadow border-0">
              <CardContent className="p-12 text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum profissional encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Não há profissionais que correspondam aos filtros selecionados.
                </p>
                <Link href="/professionals/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Profissional
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
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { Search, Plus, Edit, Trash2, Clock, DollarSign, Users, Star } from 'lucide-react';

const mockServices = [
  {
    id: 1,
    name: 'Corte Feminino',
    description: 'Corte personalizado para cabelos femininos',
    duration: '45 min',
    price: 'R$ 80',
    category: 'Cabelo',
    popularity: 95,
    bookings: 156,
    status: 'active',
    image: 'https://iili.io/FOJxsGj.png'
  },
  {
    id: 2,
    name: 'Corte Masculino',
    description: 'Corte moderno e estiloso para homens',
    duration: '30 min',
    price: 'R$ 45',
    category: 'Cabelo',
    popularity: 92,
    bookings: 198,
    status: 'active',
    image: 'https://iili.io/FOJxD8B.png'
  },
  {
    id: 3,
    name: 'Barba + Bigode',
    description: 'Aparar e modelar barba e bigode',
    duration: '25 min',
    price: 'R$ 35',
    category: 'Barbearia',
    popularity: 89,
    bookings: 167,
    status: 'active',
    image: 'https://iili.io/FNOYyn2.png'
  },
  {
    id: 4,
    name: 'Escova Progressiva',
    description: 'Tratamento alisante com duração prolongada',
    duration: '3h',
    price: 'R$ 280',
    category: 'Cabelo',
    popularity: 88,
    bookings: 89,
    status: 'active',
    image: 'https://iili.io/FOJzFFR.png'
  },
  {
    id: 5,
    name: 'Manicure Completa',
    description: 'Cuidados completos para as unhas das mãos',
    duration: '1h',
    price: 'R$ 45',
    category: 'Unhas',
    popularity: 92,
    bookings: 234,
    status: 'active',
    image: 'https://iili.io/FOJzIMG.png'
  },
  {
    id: 6,
    name: 'Pedicure Spa',
    description: 'Tratamento relaxante para os pés',
    duration: '1h 30min',
    price: 'R$ 65',
    category: 'Unhas',
    popularity: 85,
    bookings: 178,
    status: 'active',
    image: 'https://iili.io/FOJzaA7.png'
  },
  {
    id: 7,
    name: 'Alongamento de Cílios',
    description: 'Técnica fio a fio para cílios volumosos',
    duration: '2h 30min',
    price: 'R$ 200',
    category: 'Cílios',
    popularity: 96,
    bookings: 145,
    status: 'active',
    image: 'https://iili.io/FOJx6Zu.png'
  },
  {
    id: 8,
    name: 'Maquiagem Social',
    description: 'Maquiagem para eventos e ocasiões especiais',
    duration: '1h 15min',
    price: 'R$ 120',
    category: 'Maquiagem',
    popularity: 78,
    bookings: 98,
    status: 'active',
    image: 'https://iili.io/FOJzY9S.png'
  },
  {
    id: 9,
    name: 'Design de Sobrancelhas',
    description: 'Modelagem e design personalizado',
    duration: '30 min',
    price: 'R$ 35',
    category: 'Sobrancelhas',
    popularity: 90,
    bookings: 267,
    status: 'active',
    image: 'https://iili.io/FOJzJna.png'
  },
  {
    id: 10,
    name: 'Corte + Barba Completo',
    description: 'Pacote completo: corte de cabelo + barba',
    duration: '1h',
    price: 'R$ 70',
    category: 'Barbearia',
    popularity: 94,
    bookings: 156,
    status: 'active',
    image: 'https://iili.io/FOJxtaV.png'
  },
  {
    id: 11,
    name: 'Massagem Relaxante',
    description: 'Massagem terapêutica para alívio do estresse',
    duration: '1h',
    price: 'R$ 150',
    category: 'Bem-estar',
    popularity: 82,
    bookings: 67,
    status: 'active',
    image: 'https://iili.io/FOJz26v.png'
  },
  {
    id: 12,
    name: 'Relaxamento Capilar',
    description: 'Tratamento para alisar cabelos crespos',
    duration: '2h 30min',
    price: 'R$ 180',
    category: 'Cabelo',
    popularity: 76,
    bookings: 45,
    status: 'active',
    image: 'https://iili.io/FOJxbyP.png'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Ativo</Badge>;
    case 'inactive':
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Inativo</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const getCategoryColor = (category: string) => {
  const colors = {
    'Cabelo': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'Barbearia': 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400',
    'Unhas': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
    'Cílios': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'Maquiagem': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    'Sobrancelhas': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'Bem-estar': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function ServicesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditService = (serviceId: number) => {
    // Navegar para a página de edição do serviço
    router.push(`/services/edit/${serviceId}`);
  };

  const handleDeleteService = (serviceId: number, serviceName: string) => {
    if (confirm(`Tem certeza que deseja excluir o serviço "${serviceName}"?`)) {
      // Aqui você faria a chamada para a API para excluir o serviço
      console.log('Excluindo serviço:', serviceId);
      // Por enquanto, apenas mostra uma mensagem de sucesso
      alert('Serviço excluído com sucesso!');
      // Em uma aplicação real, você atualizaria o estado ou recarregaria os dados
    }
  };
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

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || service.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(mockServices.map(service => service.category))];
  const totalRevenue = mockServices.reduce((total, service) => {
    const price = parseFloat(service.price.replace('R$ ', '').replace(',', '.'));
    return total + (price * service.bookings);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
              <p className="text-muted-foreground">
                Gerencie seus serviços e preços
              </p>
            </div>
            <Link href="/services/new">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{mockServices.length}</div>
                <p className="text-sm text-muted-foreground">Total de Serviços</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mockServices.filter(s => s.status === 'active').length}
                </div>
                <p className="text-sm text-muted-foreground">Serviços Ativos</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">
                  {mockServices.reduce((total, service) => total + service.bookings, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  R$ {totalRevenue.toLocaleString('pt-BR')}
                </div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
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
                    placeholder="Buscar serviços por nome ou descrição..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">Todas as categorias</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">Todos os status</option>
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <Card key={service.id} className="beauty-shadow border-0 hover:shadow-lg transition-all duration-200 animate-slide-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(service.status)}
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription className="mt-1">{service.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Preço</p>
                      <p className="font-semibold text-green-600 text-lg">{service.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duração</p>
                      <p className="font-semibold">{service.duration}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Agendamentos</p>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span className="font-semibold">{service.bookings}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Popularidade</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="font-semibold">{service.popularity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditService(service.id)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700" onClick={() => handleDeleteService(service.id, service.name)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <Card className="beauty-shadow border-0">
              <CardContent className="p-12 text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum serviço encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Não há serviços que correspondam aos filtros selecionados.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Serviço
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
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
import { Search, Plus, TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, Filter } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    type: 'income',
    description: 'Corte + Escova - Maria Silva',
    amount: 120,
    date: '2024-01-20',
    time: '14:30',
    paymentMethod: 'PIX',
    status: 'completed',
    category: 'Serviços'
  },
  {
    id: 2,
    type: 'income',
    description: 'Manicure - Ana Costa',
    amount: 45,
    date: '2024-01-20',
    time: '15:00',
    paymentMethod: 'Dinheiro',
    status: 'completed',
    category: 'Serviços'
  },
  {
    id: 3,
    type: 'expense',
    description: 'Produtos para cabelo',
    amount: 280,
    date: '2024-01-19',
    time: '10:00',
    paymentMethod: 'Cartão de Crédito',
    status: 'completed',
    category: 'Produtos'
  },
  {
    id: 4,
    type: 'income',
    description: 'Alongamento de Cílios - Juliana Santos',
    amount: 200,
    date: '2024-01-19',
    time: '16:00',
    paymentMethod: 'PIX',
    status: 'completed',
    category: 'Serviços'
  },
  {
    id: 5,
    type: 'expense',
    description: 'Aluguel do salão',
    amount: 1500,
    date: '2024-01-18',
    time: '09:00',
    paymentMethod: 'Transferência',
    status: 'completed',
    category: 'Fixos'
  },
  {
    id: 6,
    type: 'income',
    description: 'Coloração - Carla Oliveira',
    amount: 180,
    date: '2024-01-18',
    time: '14:00',
    paymentMethod: 'Cartão de Débito',
    status: 'pending',
    category: 'Serviços'
  }
];

const getTransactionIcon = (type: string) => {
  return type === 'income' ? TrendingUp : TrendingDown;
};

const getTransactionColor = (type: string) => {
  return type === 'income' 
    ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
    : 'text-red-600 bg-red-100 dark:bg-red-900/20';
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Concluído</Badge>;
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pendente</Badge>;
    case 'cancelled':
      return <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Cancelado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  });
};

export default function FinancePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalIncome = mockTransactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const categories = [...new Set(mockTransactions.map(t => t.category))];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
              <p className="text-muted-foreground">
                Controle suas receitas, despesas e fluxo de caixa
              </p>
            </div>
            <Link href="/finance/new">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova Transação
              </Button>
            </Link>
          </div>

          {/* Financial Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
                <p className="text-sm text-muted-foreground">Receitas</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
                <p className="text-sm text-muted-foreground">Despesas</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netProfit)}
                </div>
                <p className="text-sm text-muted-foreground">Lucro Líquido</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600">{mockTransactions.length}</div>
                <p className="text-sm text-muted-foreground">Transações</p>
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
                    placeholder="Buscar transações..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="income">Receitas</option>
                    <option value="expense">Despesas</option>
                  </select>
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="beauty-shadow border-0">
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>
                Histórico de receitas e despesas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction, index) => {
                  const Icon = getTransactionIcon(transaction.type);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(transaction.date)} às {transaction.time}</span>
                            </div>
                            <span>{transaction.paymentMethod}</span>
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </p>
                        </div>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {filteredTransactions.length === 0 && (
            <Card className="beauty-shadow border-0">
              <CardContent className="p-12 text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma transação encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Não há transações que correspondam aos filtros selecionados.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Transação
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
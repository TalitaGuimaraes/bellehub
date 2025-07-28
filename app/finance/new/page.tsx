"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ArrowLeft, DollarSign, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function NewTransactionPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    paymentMethod: '',
    category: '',
    status: 'completed'
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the transaction
    console.log('Nova transação:', formData);
    router.push('/finance');
  };

  const categories = ['Serviços', 'Produtos', 'Fixos', 'Marketing', 'Equipamentos', 'Outros'];
  const paymentMethods = ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Transferência'];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/finance">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Nova Transação</h1>
                <p className="text-muted-foreground">
                  Adicione uma nova receita ou despesa
                </p>
              </div>
            </div>
          </div>

          <Card className="beauty-shadow border-0 max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Detalhes da Transação</span>
              </CardTitle>
              <CardDescription>
                Preencha os dados da nova transação financeira
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Receita</SelectItem>
                        <SelectItem value="expense">Despesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva a transação..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Horário *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Forma de Pagamento *</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map(method => (
                          <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Link href="/finance">
                    <Button type="button" variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    disabled={!formData.type || !formData.description || !formData.amount || !formData.paymentMethod || !formData.category}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Transação
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
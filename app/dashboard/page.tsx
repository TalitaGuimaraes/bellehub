"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { BirthdayClients } from '@/components/dashboard/birthday-clients';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Olá, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo ao seu painel de controle
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {user.businessType === 'salon' && 'Salão de Beleza'}
                {user.businessType === 'barbershop' && 'Barbearia'}
                {user.businessType === 'makeup' && 'Maquiadora'}
                {user.businessType === 'nails' && 'Manicure/Pedicure'}
                {user.businessType === 'lashes' && 'Alongamento de Cílios'}
                {user.businessType === 'spa' && 'Spa/Estética'}
                {user.businessType === 'other' && 'Outro'}
              </Badge>
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <UpcomingAppointments />
              <BirthdayClients />
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Clock, 
  DollarSign, 
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building
} from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [businessData, setBusinessData] = useState({
    nomeEmpresa: '',
    businessName: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false
  });
  const [businessSettings, setBusinessSettings] = useState({
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    timezone: 'America/Sao_Paulo',
    currency: 'BRL',
    language: 'pt-BR'
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        businessName: '',
        businessType: user.businessType || '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
      });
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

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessDataUpdate = (field: string, value: string) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessUpdate = (field: string, value: string) => {
    setBusinessSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving settings...', { profileData, businessData, notifications, businessSettings });
  };

  const businessTypes = [
    { value: 'salon', label: 'Salão de Beleza' },
    { value: 'barbershop', label: 'Barbearia' },
    { value: 'makeup', label: 'Maquiadora' },
    { value: 'nails', label: 'Manicure/Pedicure' },
    { value: 'lashes', label: 'Alongamento de Cílios' },
    { value: 'spa', label: 'Spa/Estética' },
    { value: 'other', label: 'Outro' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
              <p className="text-muted-foreground">
                Gerencie suas preferências e configurações do sistema
              </p>
            </div>
            <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Settings */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="beauty-shadow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Perfil Pessoal</span>
                  </CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-lg">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Alterar Foto
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleProfileUpdate('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Tipo de Negócio</Label>
                      <Select value={profileData.businessType} onValueChange={(value) => handleProfileUpdate('businessType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Settings */}
              <Card className="beauty-shadow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Informações do Negócio</span>
                  </CardTitle>
                  <CardDescription>
                    Configure as informações do seu estabelecimento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                      <Input
                        id="nomeEmpresa"
                        value={businessData.nomeEmpresa}
                        onChange={(e) => handleBusinessDataUpdate('nomeEmpresa', e.target.value)}
                        placeholder="Nome do seu negócio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nome do Estabelecimento</Label>
                      <Input
                        id="businessName"
                        value={businessData.businessName}
                        onChange={(e) => handleBusinessDataUpdate('businessName', e.target.value)}
                        placeholder="Nome do seu salão/estúdio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={businessData.address}
                        onChange={(e) => handleBusinessDataUpdate('address', e.target.value)}
                        placeholder="Rua, número"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={businessData.city}
                        onChange={(e) => handleBusinessDataUpdate('city', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Address */}
              <Card className="beauty-shadow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Endereço Completo</span>
                  </CardTitle>
                  <CardDescription>
                    Complete as informações de localização
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={businessData.state}
                        onChange={(e) => handleBusinessDataUpdate('state', e.target.value)}
                        placeholder="SP"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        value={businessData.zipCode}
                        onChange={(e) => handleBusinessDataUpdate('zipCode', e.target.value)}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Working Hours */}
              <Card className="beauty-shadow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Horário de Funcionamento</span>
                  </CardTitle>
                  <CardDescription>
                    Configure seus horários de atendimento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Horário de Abertura</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={businessSettings.workingHours.start}
                        onChange={(e) => handleBusinessUpdate('workingHours', { ...businessSettings.workingHours, start: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Horário de Fechamento</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={businessSettings.workingHours.end}
                        onChange={(e) => handleBusinessUpdate('workingHours', { ...businessSettings.workingHours, end: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="beauty-shadow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notificações</span>
                  </CardTitle>
                  <CardDescription>
                    Configure suas preferências de notificação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba emails sobre agendamentos
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba SMS para lembretes
                      </p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationUpdate('smsNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Lembretes de Agendamento</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações automáticas
                      </p>
                    </div>
                    <Switch
                      checked={notifications.appointmentReminders}
                      onCheckedChange={(checked) => handleNotificationUpdate('appointmentReminders', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* System Preferences */}
              <Card className="beauty-shadow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Preferências do Sistema</span>
                  </CardTitle>
                  <CardDescription>
                    Configure idioma, moeda e fuso horário
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select value={businessSettings.language} onValueChange={(value) => handleBusinessUpdate('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Moeda</Label>
                    <Select value={businessSettings.currency} onValueChange={(value) => handleBusinessUpdate('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real (R$)</SelectItem>
                        <SelectItem value="USD">Dólar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fuso Horário</Label>
                    <Select value={businessSettings.timezone} onValueChange={(value) => handleBusinessUpdate('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="beauty-shadow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Segurança</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie sua senha e segurança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full">
                    Configurar 2FA
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    Excluir Conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
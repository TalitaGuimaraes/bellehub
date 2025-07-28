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
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ArrowLeft, Save, Package } from 'lucide-react';
import Link from 'next/link';

const serviceImages = [
  {
    nome: "Escova Modeladora", 
    url: "https://iili.io/FOJxru9.png"
  },
  {
    nome: "Barba E Bigode",
    url: "https://iili.io/FNOYyn2.png"
  },
  {
    nome: "Cílios Natural",
    url: "https://iili.io/FOJx6Zu.png"
  },
  {
    nome: "Cílios Volumoso",
    url: "https://iili.io/FOJxSvS.png"
  },
  {
    nome: "Corte De Cabelo Feminino",
    url: "https://iili.io/FOJxsGj.png"
  },
  {
    nome: "Corte Degrade Masculino",
    url: "https://iili.io/FOJxtaV.png"
  },
  {
    nome: "Corte Masculino",
    url: "https://iili.io/FOJxD8B.png"
  },
  {
    nome: "Cuidados Cabelo Cacheado",
    url: "https://iili.io/FOJxbyP.png"
  },
  {
    nome: "Depilação",
    url: "https://iili.io/FOJxywF.png"
  },
  {
    nome: "Design De Sobrancelha",
    url: "https://iili.io/FOJzJna.png"
  },
  {
    nome: "Drenagem Linfática",
    url: "https://iili.io/FOJz26v.png"
  },
  {
    nome: "Escova Progressiva",
    url: "https://iili.io/FOJzFFR.png"
  },
  {
    nome: "Sobrancelha Com Henna",
    url: "https://iili.io/FOJzf8N.png"
  },
  {
    nome: "Limpeza De Pele",
    url: "https://iili.io/FOJzotn.png"
  },
  {
    nome: "Luzes",
    url: "https://iili.io/FOJzzns.png"
  },
  {
    nome: "Mão",
    url: "https://iili.io/FOJzIMG.png"
  },
  {
    nome: "Mão E Pé",
    url: "https://iili.io/FOJzTPf.png"
  },
  {
    nome: "Maquiagem Profissional",
    url: "https://iili.io/FOJz5S2.png"
  },
  {
    nome: "Maquiagem Social",
    url: "https://iili.io/FOJzY9S.png"
  },
  {
    nome: "Pé",
    url: "https://iili.io/FOJzaA7.png"
  },
  {
    nome: "Sobrancelha Masculino",
    url: "https://iili.io/FOJzlte.png"
  },
  {
    nome: "Tintura",
    url: "https://iili.io/FOJzWcQ.png"
  },
  {
    nome: "Tintura Cabelo Masculino",
    url: "https://iili.io/FOJzXSV.png"
  },
  {
    nome: "Tranças",
    url: "https://iili.io/FOJzjHB.png"
  }
];

const categories = [
  'Cabelo',
  'Barbearia',
  'Unhas',
  'Cílios',
  'Maquiagem',
  'Sobrancelhas',
  'Bem-estar'
];

const mockServices = [
  {
    id: 1,
    name: 'Corte Feminino',
    description: 'Corte personalizado para cabelos femininos',
    duration: '45 min',
    price: 'R$ 80',
    category: 'Cabelo',
    status: 'active'
  },
  {
    id: 2,
    name: 'Corte Masculino',
    description: 'Corte moderno e estiloso para homens',
    duration: '30 min',
    price: 'R$ 45',
    category: 'Cabelo',
    status: 'active'
  },
  {
    id: 3,
    name: 'Barba + Bigode',
    description: 'Aparar e modelar barba e bigode',
    duration: '25 min',
    price: 'R$ 35',
    category: 'Barbearia',
    status: 'active'
  },
  {
    id: 4,
    name: 'Escova Progressiva',
    description: 'Tratamento alisante com duração prolongada',
    duration: '3h',
    price: 'R$ 280',
    category: 'Cabelo',
    status: 'active'
  },
  {
    id: 5,
    name: 'Manicure Completa',
    description: 'Cuidados completos para as unhas das mãos',
    duration: '1h',
    price: 'R$ 45',
    category: 'Unhas',
    status: 'active'
  },
  {
    id: 10,
    name: 'Corte + Barba Completo',
    description: 'Pacote completo: corte de cabelo + barba',
    duration: '1h',
    price: 'R$ 70',
    category: 'Barbearia',
    status: 'active'
  }
];

export default function EditServicePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const serviceId = parseInt(params.id as string);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    duration: '',
    price: '',
    image: '',
    status: 'active'
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Carregar dados do serviço
    const service = mockServices.find(svc => svc.id === serviceId);
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        category: service.category,
        duration: service.duration,
        price: service.price,
        image: service.image || '',
        status: service.status
      });
    }
  }, [serviceId]);

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
    console.log('Editando serviço:', serviceId, formData);
    // Aqui você salvaria no backend
    router.push('/services');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Link href="/services">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Editar Serviço</h1>
              <p className="text-muted-foreground">
                Edite os dados do serviço #{serviceId}
              </p>
            </div>
          </div>

          <Card className="beauty-shadow border-0 max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Informações do Serviço</span>
              </CardTitle>
              <CardDescription>
                Atualize os dados do serviço
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Serviço *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ex: Corte Feminino"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="Ex: 1h 30min"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Preço *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="Ex: R$ 80,00"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Imagem do Serviço</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {serviceImages.map((img, index) => (
                      <div
                        key={index}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          formData.image === img.url
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleInputChange('image', img.url)}
                      >
                        <img
                          src={img.url}
                          alt={img.nome}
                          className="w-full h-20 object-cover"
                        />
                        {formData.image === img.url && (
                          <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                          {img.nome}
                        </div>
                      </div>
                    ))}
                  </div>
                  {formData.image && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrição detalhada do serviço..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Link href="/services" className="flex-1">
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
        </main>
      </div>
    </div>
  );
}
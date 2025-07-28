"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Sparkles, 
  Scissors, 
  Brush, 
  Calendar, 
  Users, 
  CreditCard, 
  BarChart3, 
  MessageSquare,
  Clock,
  Star,
  Check,
  ArrowRight,
  Play,
  Smartphone,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Agendamento Inteligente',
    description: 'Sistema completo de agendamentos com lembretes automáticos e confirmações por WhatsApp.',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
  },
  {
    icon: Users,
    title: 'Gestão de Clientes',
    description: 'Cadastro completo de clientes com histórico de atendimentos e preferências.',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
  },
  {
    icon: CreditCard,
    title: 'Controle Financeiro',
    description: 'Acompanhe receitas, despesas e tenha relatórios financeiros detalhados.',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
  },
  {
    icon: BarChart3,
    title: 'Relatórios e Análises',
    description: 'Métricas de desempenho, clientes mais frequentes e serviços mais populares.',
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Direta',
    description: 'Chat integrado para se comunicar diretamente com seus clientes.',
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
  },
  {
    icon: Clock,
    title: 'Gestão de Horários',
    description: 'Organize sua agenda com visualização diária e semanal dos atendimentos.',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
  }
];

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Proprietária - Salão Bella Vista',
    content: 'O BelleHub revolucionou meu negócio! Agora consigo organizar melhor minha agenda e meus clientes adoram os lembretes automáticos.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    rating: 5
  },
  {
    name: 'Carlos Santos',
    role: 'Barbeiro - Barbearia Moderna',
    content: 'Desde que comecei a usar o BelleHub, minha receita aumentou 30%. O controle financeiro é fantástico!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    rating: 5
  },
  {
    name: 'Ana Costa',
    role: 'Maquiadora Freelancer',
    content: 'Como trabalho em diferentes locais, o BelleHub me ajuda a manter tudo organizado. Recomendo para todas as colegas!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    rating: 5
  }
];

const plans = [
  {
    name: 'Básico',
    price: 'R$ 29',
    period: '/mês',
    description: 'Perfeito para profissionais autônomos',
    features: [
      'Até 100 agendamentos/mês',
      'Cadastro de clientes',
      'Controle financeiro básico',
      'Suporte por email'
    ],
    popular: false
  },
  {
    name: 'Profissional',
    price: 'R$ 59',
    period: '/mês',
    description: 'Ideal para salões e estúdios',
    features: [
      'Agendamentos ilimitados',
      'Gestão completa de clientes',
      'Relatórios avançados',
      'Chat com clientes',
      'Suporte prioritário',
      'Backup automático'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'R$ 99',
    period: '/mês',
    description: 'Para grandes estabelecimentos',
    features: [
      'Tudo do plano Profissional',
      'Múltiplos usuários',
      'API personalizada',
      'Treinamento dedicado',
      'Suporte 24/7',
      'Customizações'
    ],
    popular: false
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="p-1.5 rounded-lg bg-accent/10">
                <Scissors className="h-6 w-6 text-accent" />
              </div>
              <div className="p-1.5 rounded-lg bg-secondary/10">
                <Brush className="h-6 w-6 text-secondary" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BelleHub
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
              🚀 Novo: Integração com WhatsApp disponível!
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Transforme seu negócio de beleza
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Organize agendamentos, clientes e financeiro em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8 py-6">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demonstração
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              ✨ Teste grátis por 14 dias • Sem cartão de crédito • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tudo que você precisa para crescer</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Funcionalidades pensadas especialmente para profissionais da beleza
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="beauty-shadow border-0 hover:shadow-lg transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className={`p-3 rounded-lg w-fit ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Por que escolher o BelleHub?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">100% Mobile</h3>
                    <p className="text-muted-foreground">Acesse de qualquer lugar, a qualquer hora. Funciona perfeitamente no celular, tablet e computador.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Seguro e Confiável</h3>
                    <p className="text-muted-foreground">Seus dados estão protegidos com criptografia de ponta e backup automático na nuvem.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Fácil de Usar</h3>
                    <p className="text-muted-foreground">Interface intuitiva que você aprende em minutos. Sem complicações, só resultados.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-4">Mais de 10.000 profissionais</h3>
                <p className="text-muted-foreground">já confiam no BelleHub para gerenciar seus negócios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de profissionais que transformaram seus negócios
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="beauty-shadow border-0 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Planos que cabem no seu bolso</h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={plan.name} className={`beauty-shadow border-0 relative animate-slide-up ${plan.popular ? 'ring-2 ring-primary' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Começar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a milhares de profissionais que já descobriram o poder do BelleHub
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8 py-6">
                  Começar Teste Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  BelleHub
                </span>
              </div>
              <p className="text-muted-foreground">
                O sistema completo de gestão para profissionais da beleza.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Funcionalidades</Link></li>
                <li><Link href="#" className="hover:text-foreground">Preços</Link></li>
                <li><Link href="#" className="hover:text-foreground">Demonstração</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Central de Ajuda</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contato</Link></li>
                <li><Link href="#" className="hover:text-foreground">WhatsApp</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Sobre</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BelleHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Eye, EyeOff, Sparkles, Scissors, Brush } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessType: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    // Calculate password strength
    const { password } = formData;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword, businessType } = formData;

    if (!name || !email || !password || !confirmPassword || !businessType) {
      setError('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!acceptTerms) {
      setError('Você deve aceitar os termos de uso');
      return;
    }

    const success = await register(name, email, password, businessType);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Erro ao criar conta. Verifique se o email não está em uso e tente novamente.');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Fraca';
    if (passwordStrength <= 3) return 'Média';
    return 'Forte';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md animate-fade-in">
        <Card className="beauty-shadow border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="p-2 rounded-full bg-accent/10">
                <Scissors className="h-6 w-6 text-accent" />
              </div>
              <div className="p-2 rounded-full bg-secondary/10">
                <Brush className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BelleHub
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Junte-se aos profissionais da beleza que já confiam no BelleHub
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Tipo de Negócio</Label>
                <Select 
                  value={formData.businessType} 
                  onValueChange={(value) => handleInputChange('businessType', value)}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Selecione seu tipo de negócio" />
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
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite uma senha segura"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  Aceito os{' '}
                  <Link href="/terms" className="text-primary hover:text-primary/80">
                    termos de uso
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80">
                    política de privacidade
                  </Link>
                </Label>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3 animate-scale-in">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link 
                  href="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Faça login
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
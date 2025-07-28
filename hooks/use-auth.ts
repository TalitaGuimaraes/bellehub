"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, type Usuario } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  businessType?: string;
  phone?: string;
  businessName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, businessType: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão atual do Supabase
    const getSession = async () => {
      try {
        // Criar um timeout para evitar que o loading fique travado
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout na verificação de sessão')), 10000);
        });

        const sessionPromise = supabase.auth.getSession();
        
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any;
        
        if (session?.user) {
          await loadUserProfile(session.user);
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserProfile(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Buscar dados do perfil na tabela usuarios
      const { data: profile, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Erro ao carregar perfil:', error);
        return;
      }

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          avatar: profile.avatar,
          businessType: profile.business_type,
          phone: profile.phone,
          businessName: profile.business_name
        });
      }
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    }
  };

  const register = async (name: string, email: string, password: string, businessType: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('Erro na autenticação:', authError);
        return false;
      }

      if (!authData.user) {
        console.error('Usuário não foi criado');
        return false;
      }

      // 2. Criar perfil do usuário na tabela usuarios
      const { error: profileError } = await supabase
        .from('usuarios')
        .insert({
          id: authData.user.id,
          email,
          name,
          business_type: businessType,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        // Se falhar ao criar o perfil, remover o usuário da autenticação
        await supabase.auth.signOut();
        return false;
      }

      // 3. Carregar o perfil do usuário
      await loadUserProfile(authData.user);
      
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // 1. Fazer login no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Erro no login:', authError);
        return false;
      }

      if (!authData.user) {
        console.error('Usuário não encontrado');
        return false;
      }

      // 2. Carregar perfil do usuário
      await loadUserProfile(authData.user);
      
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Erro no logout:', error);
      }
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return {
    user,
    login,
    register,
    logout,
    isLoading
  };
}

export { AuthContext };
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
import { Search, Plus, Send, Phone, Video, MoreVertical, MessageSquare, Clock } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    client: {
      name: 'Maria Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      phone: '(11) 99999-1111'
    },
    lastMessage: 'Obrigada pelo atendimento! Ficou perfeito!',
    timestamp: '2024-01-20T15:30:00',
    unread: 0,
    status: 'online'
  },
  {
    id: 2,
    client: {
      name: 'Ana Costa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
      phone: '(11) 88888-2222'
    },
    lastMessage: 'Posso remarcar para amanhã às 14h?',
    timestamp: '2024-01-20T14:15:00',
    unread: 2,
    status: 'offline'
  },
  {
    id: 3,
    client: {
      name: 'Juliana Santos',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juliana',
      phone: '(11) 77777-3333'
    },
    lastMessage: 'Qual o valor do alongamento de cílios?',
    timestamp: '2024-01-20T13:45:00',
    unread: 1,
    status: 'online'
  },
  {
    id: 4,
    client: {
      name: 'Carla Oliveira',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carla',
      phone: '(11) 66666-4444'
    },
    lastMessage: 'Muito obrigada! Até a próxima 😊',
    timestamp: '2024-01-20T12:30:00',
    unread: 0,
    status: 'offline'
  },
  {
    id: 5,
    client: {
      name: 'Patricia Rocha',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia',
      phone: '(11) 44444-6666'
    },
    lastMessage: 'Oi! Gostaria de agendar um horário',
    timestamp: '2024-01-20T11:20:00',
    unread: 3,
    status: 'online'
  }
];

const mockMessages = [
  {
    id: 1,
    sender: 'client',
    message: 'Oi! Gostaria de agendar um horário para corte e escova',
    timestamp: '2024-01-20T11:20:00'
  },
  {
    id: 2,
    sender: 'me',
    message: 'Olá! Claro, que dia você prefere?',
    timestamp: '2024-01-20T11:22:00'
  },
  {
    id: 3,
    sender: 'client',
    message: 'Seria possível amanhã pela manhã?',
    timestamp: '2024-01-20T11:25:00'
  },
  {
    id: 4,
    sender: 'me',
    message: 'Tenho disponível às 9h ou 10h30. Qual prefere?',
    timestamp: '2024-01-20T11:26:00'
  },
  {
    id: 5,
    sender: 'client',
    message: 'Às 10h30 é perfeito! Qual o valor?',
    timestamp: '2024-01-20T11:28:00'
  }
];

const getStatusColor = (status: string) => {
  return status === 'online' ? 'bg-green-500' : 'bg-gray-400';
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return formatTime(timestamp);
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem';
  } else {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short' 
    });
  }
};

export default function MessagesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

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

  const filteredConversations = mockConversations.filter(conversation =>
    conversation.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unread, 0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
              <p className="text-muted-foreground">
                Converse com seus clientes
              </p>
            </div>
            <Link href="/messages/new">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova Conversa
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{mockConversations.length}</div>
                <p className="text-sm text-muted-foreground">Conversas Ativas</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">{totalUnread}</div>
                <p className="text-sm text-muted-foreground">Não Lidas</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mockConversations.filter(c => c.status === 'online').length}
                </div>
                <p className="text-sm text-muted-foreground">Online Agora</p>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <p className="text-sm text-muted-foreground">Taxa de Resposta</p>
              </CardContent>
            </Card>
          </div>

          {/* Messages Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="beauty-shadow border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Conversas</CardTitle>
                  <Badge variant="secondary">{totalUnread} não lidas</Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversas..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[480px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedConversation.id === conversation.id ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.client.avatar} alt={conversation.client.name} />
                            <AvatarFallback>
                              {conversation.client.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(conversation.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{conversation.client.name}</p>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-muted-foreground">
                                {formatDate(conversation.timestamp)}
                              </span>
                              {conversation.unread > 0 && (
                                <Badge variant="default" className="bg-primary text-primary-foreground text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="beauty-shadow border-0 h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConversation.client.avatar} alt={selectedConversation.client.name} />
                          <AvatarFallback>
                            {selectedConversation.client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedConversation.status)}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedConversation.client.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.status === 'online' ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`tel:${selectedConversation.client.phone}`}>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => console.log('Iniciar videochamada')}>
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => console.log('Mais opções')}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
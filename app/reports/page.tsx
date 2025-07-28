"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Calendar, Download, Filter, Eye, FileText, FileSpreadsheet, Mail } from 'lucide-react';
const mockReports = [
  {
    id: 1,
    title: 'Receita Mensal',
    description: 'Análise de receitas dos últimos 12 meses',
    type: 'financial',
    period: 'Últimos 12 meses',
    value: 'R$ 45.680',
    change: '+12.5%',
    trend: 'up',
    lastUpdated: '2024-01-20'
  },
  {
    id: 2,
    title: 'Clientes Ativos',
    description: 'Crescimento da base de clientes',
    type: 'clients',
    period: 'Este mês',
    value: '142',
    change: '+8 novos',
    trend: 'up',
    lastUpdated: '2024-01-20'
  },
  {
    id: 3,
    title: 'Serviços Populares',
    description: 'Ranking dos serviços mais solicitados',
    type: 'services',
    period: 'Últimos 30 dias',
    value: 'Corte Feminino',
    change: '156 agendamentos',
    trend: 'up',
    lastUpdated: '2024-01-20'
  },
  {
    id: 4,
    title: 'Taxa de Ocupação',
    description: 'Utilização da agenda disponível',
    type: 'schedule',
    period: 'Esta semana',
    value: '87%',
    change: '+5% vs semana anterior',
    trend: 'up',
    lastUpdated: '2024-01-20'
  },
  {
    id: 5,
    title: 'Ticket Médio',
    description: 'Valor médio por atendimento',
    type: 'financial',
    period: 'Últimos 30 dias',
    value: 'R$ 95',
    change: '-2.1%',
    trend: 'down',
    lastUpdated: '2024-01-20'
  },
  {
    id: 6,
    title: 'Retenção de Clientes',
    description: 'Taxa de retorno dos clientes',
    type: 'clients',
    period: 'Últimos 6 meses',
    value: '78%',
    change: '+3.2%',
    trend: 'up',
    lastUpdated: '2024-01-20'
  }
];

const getReportIcon = (type: string) => {
  switch (type) {
    case 'financial':
      return DollarSign;
    case 'clients':
      return Users;
    case 'services':
      return BarChart3;
    case 'schedule':
      return Calendar;
    default:
      return BarChart3;
  }
};

const getReportColor = (type: string) => {
  switch (type) {
    case 'financial':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'clients':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'services':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
    case 'schedule':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const getTrendIcon = (trend: string) => {
  return trend === 'up' ? TrendingUp : TrendingDown;
};

const getTrendColor = (trend: string) => {
  return trend === 'up' ? 'text-green-600' : 'text-red-600';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  });
};

export default function ReportsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('all');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportMethod, setExportMethod] = useState('download');
  const [exportEmail, setExportEmail] = useState('');
  const [filterData, setFilterData] = useState({
    startDate: '',
    endDate: '',
    period: 'last30days',
    types: {
      financial: true,
      clients: true,
      services: true,
      schedule: true
    }
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

  const filteredReports = mockReports.filter(report => {
    return selectedType === 'all' || report.type === selectedType;
  });

  const reportTypes = [...new Set(mockReports.map(report => report.type))];

  const handleExportReports = () => {
    if (exportMethod === 'email' && !exportEmail) {
      toast.error('Por favor, informe o email para envio.');
      return;
    }

    try {
      // Verificar se há relatórios para exportar
      if (filteredReports.length === 0) {
        toast.error('Não há relatórios para exportar com os filtros atuais.');
        return;
      }

      const data = filteredReports.map(report => ({
        ID: report.id,
        Título: report.title,
        Tipo: report.type === 'financial' ? 'Financeiro' : 
              report.type === 'clients' ? 'Clientes' :
              report.type === 'services' ? 'Serviços' :
              report.type === 'schedule' ? 'Agenda' : report.type,
        Período: report.period,
        Valor: report.value,
        Mudança: report.change,
        Tendência: report.trend === 'up' ? 'Crescimento' : 'Declínio',
        'Última Atualização': new Date(report.lastUpdated).toLocaleDateString('pt-BR')
      }));

      const fileName = `relatorios_${new Date().toISOString().split('T')[0]}`;

      // Mostrar loading
      toast.loading('Gerando relatório...', { id: 'export-loading' });
      if (exportMethod === 'download') {
        if (exportFormat === 'csv') {
          exportToCSV(data, fileName);
          toast.success('Relatório CSV baixado com sucesso!', { id: 'export-loading' });
        } else if (exportFormat === 'xlsx') {
          exportToXLSX(data, fileName);
          toast.success('Relatório Excel baixado com sucesso!', { id: 'export-loading' });
        } else if (exportFormat === 'pdf') {
          exportToPDF(data, fileName);
          // O toast de sucesso é chamado dentro da função exportToPDF
          toast.dismiss('export-loading');
        }
      } else if (exportMethod === 'email') {
        sendReportByEmail(data, exportEmail, exportFormat, fileName);
        toast.dismiss('export-loading');
      }

      setIsExportDialogOpen(false);
      setExportEmail('');
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(`Erro ao exportar relatório: ${errorMessage}`, { id: 'export-loading' });
    }
  };

  const exportToCSV = (data: any[], fileName: string) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escapar aspas duplas e envolver em aspas se contém vírgula ou quebra de linha
          if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToXLSX = (data: any[], fileName: string) => {
    try {
      if (!data || data.length === 0) {
        throw new Error('Não há dados para exportar');
      }

      // Implementação básica de XLSX usando uma estrutura XML simples
      const headers = Object.keys(data[0]);
      
      let xmlContent = `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Worksheet ss:Name="Relatórios">
  <Table>
   <Row>`;

      // Adicionar cabeçalhos
      headers.forEach(header => {
        xmlContent += `<Cell><Data ss:Type="String">${header}</Data></Cell>`;
      });
      xmlContent += `</Row>`;

      // Adicionar dados
      data.forEach(row => {
        xmlContent += `<Row>`;
        headers.forEach(header => {
          const value = row[header];
          const type = typeof value === 'number' ? 'Number' : 'String';
          xmlContent += `<Cell><Data ss:Type="${type}">${value}</Data></Cell>`;
        });
        xmlContent += `</Row>`;
      });

      xmlContent += `</Table>
 </Worksheet>
</Workbook>`;

      const blob = new Blob([xmlContent], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.setAttribute('download', `${fileName}_${timestamp}.xls`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar XLSX:', error);
      throw error;
    }
  };

  const exportToPDF = (data: any[], fileName: string) => {
    try {
      // Verificar se há dados para exportar
      if (!data || data.length === 0) {
        toast.error('Não há dados para exportar.');
        return;
      }

      // Criar novo documento PDF
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Configurar fonte
      doc.setFont('helvetica');
      
      // Adicionar cabeçalho
      doc.setFontSize(18);
      doc.setTextColor(51, 51, 51);
      doc.text('Relatórios - BelleHub', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
      
      // Adicionar data de geração
      doc.setFontSize(10);
      doc.setTextColor(102, 102, 102);
      const currentDate = new Date();
      const dateString = `Gerado em: ${currentDate.toLocaleDateString('pt-BR')} às ${currentDate.toLocaleTimeString('pt-BR')}`;
      doc.text(dateString, doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
      
      // Preparar dados para a tabela
      const headers = Object.keys(data[0]);
      const rows = data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Converter valores para string e limitar tamanho
          return String(value || '').substring(0, 50);
        })
      );
      
      // Verificar se autoTable está disponível
      // Adicionar tabela usando autoTable
      (doc as any).autoTable({
        head: [headers.map(header => header.charAt(0).toUpperCase() + header.slice(1))],
        body: rows,
        startY: 40,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          halign: 'left',
          valign: 'middle'
        },
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        margin: { top: 40, left: 10, right: 10, bottom: 20 },
        theme: 'striped',
        tableWidth: 'auto',
        columnStyles: headers.reduce((acc, _, index) => {
          acc[index] = { cellWidth: 'auto', minCellWidth: 20 };
          return acc;
        }, {} as any)
      });
      
      // Adicionar rodapé
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Página ${i} de ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }
      
      // Salvar o PDF com nome único
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const finalFileName = `${fileName}_${timestamp}.pdf`;
      
      // Tentar salvar o arquivo
      doc.save(finalFileName);
      
      // Aguardar um pouco para garantir que o download iniciou
      setTimeout(() => {
        toast.success(`Relatório PDF "${finalFileName}" baixado com sucesso!`);
      }, 500);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(`Erro ao gerar PDF: ${errorMessage}`);
    }
  };

  const sendReportByEmail = async (data: any[], email: string, format: string, fileName: string) => {
    // Simulação de envio por email
    toast.loading('Enviando relatório por email...', { id: 'email-sending' });
    
    // Simular delay de envio
    setTimeout(() => {
      toast.success(`Relatório ${format.toUpperCase()} enviado para ${email}`, { id: 'email-sending' });
    }, 2000);
    
    // Em uma implementação real, você faria uma chamada para sua API:
    /*
    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, email, format, fileName })
      });
      
      if (response.ok) {
        toast.success(`Relatório enviado para ${email}`);
      } else {
        throw new Error('Falha no envio');
      }
    } catch (error) {
      toast.error('Erro ao enviar email. Tente novamente.');
    }
    */
  };


  const handleApplyFilters = () => {
    // Aplicar filtros baseados nas datas e tipos selecionados
    console.log('Aplicando filtros:', filterData);
    
    // Simular aplicação de filtros
    alert(`Filtros aplicados:\n\nPeríodo: ${filterData.period}\nData Início: ${filterData.startDate || 'Não definida'}\nData Fim: ${filterData.endDate || 'Não definida'}\n\nTipos selecionados:\n${Object.entries(filterData.types).filter(([_, selected]) => selected).map(([type, _]) => `- ${type}`).join('\n')}`);
    
    setIsFilterDialogOpen(false);
  };

  const handleFilterTypeChange = (type: string, checked: boolean) => {
    setFilterData(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: checked
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
              <p className="text-muted-foreground">
                Análises e métricas do seu negócio
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filtros Avançados</DialogTitle>
                    <DialogDescription>
                      Configure os filtros para os relatórios
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Período</Label>
                      <Select value={filterData.period} onValueChange={(value) => setFilterData(prev => ({ ...prev, period: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Hoje</SelectItem>
                          <SelectItem value="yesterday">Ontem</SelectItem>
                          <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                          <SelectItem value="last30days">Últimos 30 dias</SelectItem>
                          <SelectItem value="last90days">Últimos 90 dias</SelectItem>
                          <SelectItem value="thismonth">Este mês</SelectItem>
                          <SelectItem value="lastmonth">Mês passado</SelectItem>
                          <SelectItem value="thisyear">Este ano</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {filterData.period === 'custom' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Data Início</Label>
                          <Input
                            type="date"
                            value={filterData.startDate}
                            onChange={(e) => setFilterData(prev => ({ ...prev, startDate: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Data Fim</Label>
                          <Input
                            type="date"
                            value={filterData.endDate}
                            onChange={(e) => setFilterData(prev => ({ ...prev, endDate: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Tipos de Relatório</Label>
                      <div className="space-y-2">
                        {Object.entries(filterData.types).map(([type, checked]) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              checked={checked}
                              onCheckedChange={(checked) => handleFilterTypeChange(type, checked as boolean)}
                            />
                            <Label htmlFor={type} className="capitalize">
                              {type === 'financial' ? 'Financeiro' : 
                               type === 'clients' ? 'Clientes' :
                               type === 'services' ? 'Serviços' :
                               type === 'schedule' ? 'Agenda' : type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleApplyFilters} className="flex-1">
                        Aplicar Filtros
                      </Button>
                      <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Exportar Relatórios</DialogTitle>
                    <DialogDescription>
                      Escolha o formato e método de exportação
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Formato</Label>
                      <Select value={exportFormat} onValueChange={setExportFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">
                            <div className="flex items-center">
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              CSV
                            </div>
                          </SelectItem>
                          <SelectItem value="xlsx">
                            <div className="flex items-center">
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Excel (XLSX)
                            </div>
                          </SelectItem>
                          <SelectItem value="pdf">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              PDF
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Método</Label>
                      <Select value={exportMethod} onValueChange={setExportMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="download">
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </div>
                          </SelectItem>
                          <SelectItem value="email">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              Enviar por Email
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {exportMethod === 'email' && (
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          value={exportEmail}
                          onChange={(e) => setExportEmail(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleExportReports} className="flex-1">
                        Exportar
                      </Button>
                      <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">R$ 45.680</div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">142</div>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+8 novos</span>
                </div>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">87%</div>
                <p className="text-sm text-muted-foreground">Taxa de Ocupação</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+5%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="beauty-shadow border-0">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600">R$ 95</div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  <span className="text-xs text-red-600">-2.1%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="beauty-shadow border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="financial">Financeiro</option>
                    <option value="clients">Clientes</option>
                    <option value="services">Serviços</option>
                    <option value="schedule">Agenda</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report, index) => {
              const Icon = getReportIcon(report.type);
              const TrendIcon = getTrendIcon(report.trend);
              
              return (
                <Card key={report.id} className="beauty-shadow border-0 hover:shadow-lg transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getReportColor(report.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{report.value}</div>
                      <div className={`flex items-center justify-center mt-2 ${getTrendColor(report.trend)}`}>
                        <TrendIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{report.change}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Período:</span>
                        <span>{report.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Atualizado:</span>
                        <span>{formatDate(report.lastUpdated)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => toast.info(`Detalhes do relatório: ${report.title}\n\nEsta funcionalidade será implementada em breve.`)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver Detalhes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => {
                          const singleReportData = [{
                            ID: report.id,
                            Título: report.title,
                            Tipo: report.type === 'financial' ? 'Financeiro' : 
                                  report.type === 'clients' ? 'Clientes' :
                                  report.type === 'services' ? 'Serviços' :
                                  report.type === 'schedule' ? 'Agenda' : report.type,
                            Período: report.period,
                            Valor: report.value,
                            Mudança: report.change,
                            Tendência: report.trend === 'up' ? 'Crescimento' : 'Declínio',
                            'Última Atualização': new Date(report.lastUpdated).toLocaleDateString('pt-BR')
                          }];
                          
                          const fileName = `relatorio_${report.title.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}`;
                          exportToCSV(singleReportData, fileName);
                          toast.success('Relatório individual exportado!');
                        }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Exportar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredReports.length === 0 && (
            <Card className="beauty-shadow border-0">
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum relatório encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Não há relatórios que correspondam aos filtros selecionados.
                </p>
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
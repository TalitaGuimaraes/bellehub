/*
  # Adicionar coluna nome_empresa na tabela configurações

  1. Alterações na Tabela
    - Adicionar coluna `nome_empresa` (text) na tabela `bellehub_settings`
    - Coluna será usada para armazenar o nome do negócio do usuário
    - Disponível para leitura e edição no painel de configurações

  2. Segurança
    - A coluna herda as políticas RLS existentes da tabela
    - Usuários autenticados podem ler e editar seus próprios dados
*/

-- Adicionar coluna nome_empresa na tabela bellehub_settings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bellehub_settings' AND column_name = 'nome_empresa'
  ) THEN
    ALTER TABLE bellehub_settings ADD COLUMN nome_empresa text;
  END IF;
END $$;

-- Criar índice para otimizar consultas por nome da empresa
CREATE INDEX IF NOT EXISTS bellehub_settings_nome_empresa_idx ON bellehub_settings(nome_empresa);

-- Comentário para documentação
COMMENT ON COLUMN bellehub_settings.nome_empresa IS 'Nome do negócio/empresa do usuário';
/*
  # Create reports table

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `type` (text) - financial, clients, services, schedule
      - `period` (text)
      - `data` (jsonb) - report data
      - `generated_at` (timestamp)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `reports` table
    - Add policies for authenticated users to manage their own reports
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('financial', 'clients', 'services', 'schedule')),
  period text NOT NULL,
  data jsonb DEFAULT '{}',
  generated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own reports"
  ON reports
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS reports_user_id_idx ON reports(user_id);
CREATE INDEX IF NOT EXISTS reports_type_idx ON reports(type);
CREATE INDEX IF NOT EXISTS reports_generated_at_idx ON reports(generated_at);
/*
  # Create clients table

  1. New Tables
    - `clients`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `birth_date` (date)
      - `address` (text)
      - `city` (text)
      - `notes` (text)
      - `preferred_services` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `clients` table
    - Add policies for authenticated users to manage their own clients
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  birth_date date,
  address text,
  city text,
  notes text,
  preferred_services text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own clients"
  ON clients
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS clients_user_id_idx ON clients(user_id);
CREATE INDEX IF NOT EXISTS clients_status_idx ON clients(status);
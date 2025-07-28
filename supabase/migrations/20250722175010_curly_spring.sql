/*
  # Create BelleHub clients table

  1. New Tables
    - `bellehub_clients`
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
    - Enable RLS on `bellehub_clients` table
    - Add policies for authenticated users to manage their own clients
*/

CREATE TABLE IF NOT EXISTS bellehub_clients (
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

ALTER TABLE bellehub_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own clients"
  ON bellehub_clients
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_clients_user_id_idx ON bellehub_clients(user_id);
CREATE INDEX IF NOT EXISTS bellehub_clients_status_idx ON bellehub_clients(status);
CREATE INDEX IF NOT EXISTS bellehub_clients_name_idx ON bellehub_clients(name);
CREATE INDEX IF NOT EXISTS bellehub_clients_phone_idx ON bellehub_clients(phone);
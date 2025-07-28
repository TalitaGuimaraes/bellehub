/*
  # Create BelleHub professionals table

  1. New Tables
    - `bellehub_professionals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `birth_date` (date)
      - `address` (text)
      - `city` (text)
      - `specialty` (text)
      - `commission_rate` (decimal)
      - `hire_date` (date)
      - `status` (text)
      - `notes` (text)
      - `services` (text array)
      - `total_services` (integer)
      - `monthly_revenue` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `bellehub_professionals` table
    - Add policies for authenticated users to manage their own professionals
*/

CREATE TABLE IF NOT EXISTS bellehub_professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  birth_date date,
  address text,
  city text,
  specialty text NOT NULL,
  commission_rate decimal(5,2) NOT NULL DEFAULT 0,
  hire_date date NOT NULL DEFAULT CURRENT_DATE,
  status text DEFAULT 'active',
  notes text,
  services text[] DEFAULT '{}',
  total_services integer DEFAULT 0,
  monthly_revenue decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bellehub_professionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own professionals"
  ON bellehub_professionals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_professionals_user_id_idx ON bellehub_professionals(user_id);
CREATE INDEX IF NOT EXISTS bellehub_professionals_status_idx ON bellehub_professionals(status);
CREATE INDEX IF NOT EXISTS bellehub_professionals_specialty_idx ON bellehub_professionals(specialty);
CREATE INDEX IF NOT EXISTS bellehub_professionals_email_idx ON bellehub_professionals(email);
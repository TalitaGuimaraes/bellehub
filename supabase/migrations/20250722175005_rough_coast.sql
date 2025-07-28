/*
  # Create BelleHub users table

  1. New Tables
    - `bellehub_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text)
      - `business_name` (text)
      - `business_type` (text)
      - `avatar` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `bellehub_users` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS bellehub_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  business_name text,
  business_type text DEFAULT 'salon',
  avatar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bellehub_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON bellehub_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON bellehub_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON bellehub_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE INDEX IF NOT EXISTS bellehub_users_email_idx ON bellehub_users(email);
CREATE INDEX IF NOT EXISTS bellehub_users_business_type_idx ON bellehub_users(business_type);
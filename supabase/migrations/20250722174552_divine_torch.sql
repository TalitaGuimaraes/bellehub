/*
  # Create services table

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `duration` (text)
      - `price` (decimal)
      - `image` (text)
      - `status` (text)
      - `popularity` (integer)
      - `total_bookings` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `services` table
    - Add policies for authenticated users to manage their own services
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  duration text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  image text,
  status text DEFAULT 'active',
  popularity integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own services"
  ON services
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS services_user_id_idx ON services(user_id);
CREATE INDEX IF NOT EXISTS services_category_idx ON services(category);
CREATE INDEX IF NOT EXISTS services_status_idx ON services(status);
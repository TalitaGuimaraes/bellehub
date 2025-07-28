/*
  # Create BelleHub services table

  1. New Tables
    - `bellehub_services`
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
    - Enable RLS on `bellehub_services` table
    - Add policies for authenticated users to manage their own services
*/

CREATE TABLE IF NOT EXISTS bellehub_services (
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

ALTER TABLE bellehub_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own services"
  ON bellehub_services
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_services_user_id_idx ON bellehub_services(user_id);
CREATE INDEX IF NOT EXISTS bellehub_services_category_idx ON bellehub_services(category);
CREATE INDEX IF NOT EXISTS bellehub_services_status_idx ON bellehub_services(status);
CREATE INDEX IF NOT EXISTS bellehub_services_name_idx ON bellehub_services(name);
/*
  # Create BelleHub appointments table

  1. New Tables
    - `bellehub_appointments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `client_id` (uuid, foreign key)
      - `service_id` (uuid, foreign key)
      - `professional_id` (uuid, foreign key)
      - `date` (date)
      - `time` (time)
      - `duration` (text)
      - `status` (text)
      - `price` (decimal)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `bellehub_appointments` table
    - Add policies for authenticated users to manage their own appointments
*/

CREATE TABLE IF NOT EXISTS bellehub_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES bellehub_clients(id) ON DELETE CASCADE NOT NULL,
  service_id uuid REFERENCES bellehub_services(id) ON DELETE CASCADE NOT NULL,
  professional_id uuid REFERENCES bellehub_professionals(id) ON DELETE SET NULL,
  date date NOT NULL,
  time time NOT NULL,
  duration text,
  status text DEFAULT 'pending',
  price decimal(10,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bellehub_appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own appointments"
  ON bellehub_appointments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_appointments_user_id_idx ON bellehub_appointments(user_id);
CREATE INDEX IF NOT EXISTS bellehub_appointments_client_id_idx ON bellehub_appointments(client_id);
CREATE INDEX IF NOT EXISTS bellehub_appointments_service_id_idx ON bellehub_appointments(service_id);
CREATE INDEX IF NOT EXISTS bellehub_appointments_professional_id_idx ON bellehub_appointments(professional_id);
CREATE INDEX IF NOT EXISTS bellehub_appointments_date_idx ON bellehub_appointments(date);
CREATE INDEX IF NOT EXISTS bellehub_appointments_status_idx ON bellehub_appointments(status);
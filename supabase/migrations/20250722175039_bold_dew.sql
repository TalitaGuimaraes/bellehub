/*
  # Create BelleHub schedule table

  1. New Tables
    - `bellehub_schedule`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `professional_id` (uuid, foreign key, optional)
      - `date` (date)
      - `time_slot` (text)
      - `available` (boolean)
      - `appointment_id` (uuid, foreign key, optional)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `bellehub_schedule` table
    - Add policies for authenticated users to manage their own schedule
*/

CREATE TABLE IF NOT EXISTS bellehub_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  professional_id uuid REFERENCES bellehub_professionals(id) ON DELETE CASCADE,
  date date NOT NULL,
  time_slot text NOT NULL,
  available boolean DEFAULT true,
  appointment_id uuid REFERENCES bellehub_appointments(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bellehub_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own schedule"
  ON bellehub_schedule
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_schedule_user_id_idx ON bellehub_schedule(user_id);
CREATE INDEX IF NOT EXISTS bellehub_schedule_professional_id_idx ON bellehub_schedule(professional_id);
CREATE INDEX IF NOT EXISTS bellehub_schedule_date_idx ON bellehub_schedule(date);
CREATE INDEX IF NOT EXISTS bellehub_schedule_available_idx ON bellehub_schedule(available);

-- Unique constraint to prevent double booking
CREATE UNIQUE INDEX IF NOT EXISTS bellehub_schedule_unique_slot 
ON bellehub_schedule(user_id, professional_id, date, time_slot) 
WHERE appointment_id IS NOT NULL;
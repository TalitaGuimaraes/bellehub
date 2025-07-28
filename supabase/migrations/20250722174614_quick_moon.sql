/*
  # Create schedule table

  1. New Tables
    - `schedule`
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
    - Enable RLS on `schedule` table
    - Add policies for authenticated users to manage their own schedule
*/

CREATE TABLE IF NOT EXISTS schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  professional_id uuid REFERENCES professionals(id) ON DELETE CASCADE,
  date date NOT NULL,
  time_slot text NOT NULL,
  available boolean DEFAULT true,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own schedule"
  ON schedule
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS schedule_user_id_idx ON schedule(user_id);
CREATE INDEX IF NOT EXISTS schedule_professional_id_idx ON schedule(professional_id);
CREATE INDEX IF NOT EXISTS schedule_date_idx ON schedule(date);
CREATE INDEX IF NOT EXISTS schedule_available_idx ON schedule(available);

-- Unique constraint to prevent double booking
CREATE UNIQUE INDEX IF NOT EXISTS schedule_unique_slot 
ON schedule(user_id, professional_id, date, time_slot) 
WHERE appointment_id IS NOT NULL;
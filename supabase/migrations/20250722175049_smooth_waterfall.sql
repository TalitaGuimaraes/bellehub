/*
  # Create BelleHub settings table

  1. New Tables
    - `bellehub_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `business_name` (text)
      - `business_address` (text)
      - `business_city` (text)
      - `business_state` (text)
      - `business_zip_code` (text)
      - `working_hours_start` (time)
      - `working_hours_end` (time)
      - `timezone` (text)
      - `currency` (text)
      - `language` (text)
      - `notifications_email` (boolean)
      - `notifications_sms` (boolean)
      - `notifications_appointment_reminders` (boolean)
      - `notifications_marketing_emails` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `bellehub_settings` table
    - Add policies for authenticated users to manage their own settings
*/

CREATE TABLE IF NOT EXISTS bellehub_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_name text,
  business_address text,
  business_city text,
  business_state text,
  business_zip_code text,
  working_hours_start time DEFAULT '09:00',
  working_hours_end time DEFAULT '18:00',
  timezone text DEFAULT 'America/Sao_Paulo',
  currency text DEFAULT 'BRL',
  language text DEFAULT 'pt-BR',
  notifications_email boolean DEFAULT true,
  notifications_sms boolean DEFAULT false,
  notifications_appointment_reminders boolean DEFAULT true,
  notifications_marketing_emails boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bellehub_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own settings"
  ON bellehub_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_settings_user_id_idx ON bellehub_settings(user_id);
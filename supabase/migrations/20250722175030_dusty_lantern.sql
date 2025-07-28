/*
  # Create BelleHub transactions table

  1. New Tables
    - `bellehub_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `appointment_id` (uuid, foreign key, optional)
      - `type` (text) - income or expense
      - `description` (text)
      - `amount` (decimal)
      - `date` (date)
      - `time` (time)
      - `payment_method` (text)
      - `category` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `bellehub_transactions` table
    - Add policies for authenticated users to manage their own transactions
*/

CREATE TABLE IF NOT EXISTS bellehub_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  appointment_id uuid REFERENCES bellehub_appointments(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  description text NOT NULL,
  amount decimal(10,2) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  time time NOT NULL DEFAULT CURRENT_TIME,
  payment_method text NOT NULL,
  category text NOT NULL,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bellehub_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own transactions"
  ON bellehub_transactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_transactions_user_id_idx ON bellehub_transactions(user_id);
CREATE INDEX IF NOT EXISTS bellehub_transactions_type_idx ON bellehub_transactions(type);
CREATE INDEX IF NOT EXISTS bellehub_transactions_date_idx ON bellehub_transactions(date);
CREATE INDEX IF NOT EXISTS bellehub_transactions_category_idx ON bellehub_transactions(category);
CREATE INDEX IF NOT EXISTS bellehub_transactions_status_idx ON bellehub_transactions(status);
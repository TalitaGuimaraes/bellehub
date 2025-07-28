/*
  # Create transactions table

  1. New Tables
    - `transactions`
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
    - Enable RLS on `transactions` table
    - Add policies for authenticated users to manage their own transactions
*/

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
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

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own transactions"
  ON transactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS transactions_user_id_idx ON transactions(user_id);
CREATE INDEX IF NOT EXISTS transactions_type_idx ON transactions(type);
CREATE INDEX IF NOT EXISTS transactions_date_idx ON transactions(date);
CREATE INDEX IF NOT EXISTS transactions_category_idx ON transactions(category);
CREATE INDEX IF NOT EXISTS transactions_status_idx ON transactions(status);
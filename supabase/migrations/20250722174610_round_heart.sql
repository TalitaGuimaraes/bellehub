/*
  # Create messages table

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `client_id` (uuid, foreign key)
      - `sender` (text) - 'user' or 'client'
      - `message` (text)
      - `timestamp` (timestamp)
      - `read` (boolean)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `messages` table
    - Add policies for authenticated users to manage their own messages
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'client')),
  message text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own messages"
  ON messages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS messages_user_id_idx ON messages(user_id);
CREATE INDEX IF NOT EXISTS messages_client_id_idx ON messages(client_id);
CREATE INDEX IF NOT EXISTS messages_timestamp_idx ON messages(timestamp);
CREATE INDEX IF NOT EXISTS messages_read_idx ON messages(read);
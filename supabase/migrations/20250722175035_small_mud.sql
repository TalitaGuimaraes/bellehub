/*
  # Create BelleHub messages table

  1. New Tables
    - `bellehub_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `client_id` (uuid, foreign key)
      - `sender` (text) - 'user' or 'client'
      - `message` (text)
      - `timestamp` (timestamp)
      - `read` (boolean)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `bellehub_messages` table
    - Add policies for authenticated users to manage their own messages
*/

CREATE TABLE IF NOT EXISTS bellehub_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES bellehub_clients(id) ON DELETE CASCADE NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'client')),
  message text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bellehub_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own messages"
  ON bellehub_messages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS bellehub_messages_user_id_idx ON bellehub_messages(user_id);
CREATE INDEX IF NOT EXISTS bellehub_messages_client_id_idx ON bellehub_messages(client_id);
CREATE INDEX IF NOT EXISTS bellehub_messages_timestamp_idx ON bellehub_messages(timestamp);
CREATE INDEX IF NOT EXISTS bellehub_messages_read_idx ON bellehub_messages(read);
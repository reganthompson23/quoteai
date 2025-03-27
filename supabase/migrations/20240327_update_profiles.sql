-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS about TEXT,
ADD COLUMN IF NOT EXISTS services TEXT[];

-- Add updated_at trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 
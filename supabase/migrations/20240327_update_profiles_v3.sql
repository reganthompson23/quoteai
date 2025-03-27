-- Add contact_email column for customer-facing email
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS contact_email TEXT; 
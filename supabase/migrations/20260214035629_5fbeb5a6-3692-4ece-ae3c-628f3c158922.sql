
-- Create email validation function
CREATE OR REPLACE FUNCTION public.is_valid_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    AND length(email) <= 255;
END;
$$ LANGUAGE plpgsql IMMUTABLE SET search_path = public;

-- Replace permissive policy with validated one
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe with valid email"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (public.is_valid_email(email));

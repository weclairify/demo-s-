CREATE TABLE public.lead_magnet_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.lead_magnet_signups TO anon;
GRANT INSERT ON public.lead_magnet_signups TO authenticated;
GRANT ALL ON public.lead_magnet_signups TO service_role;

ALTER TABLE public.lead_magnet_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for the lead magnet"
ON public.lead_magnet_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(first_name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

CREATE INDEX idx_lead_magnet_signups_email ON public.lead_magnet_signups(email);
CREATE INDEX idx_lead_magnet_signups_created_at ON public.lead_magnet_signups(created_at DESC);

CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'thinking',
  tags TEXT[] NOT NULL DEFAULT '{}',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  reading_time TEXT NOT NULL DEFAULT '5 min read',
  substack_url TEXT NOT NULL DEFAULT '',
  author_name TEXT NOT NULL DEFAULT 'Nicole',
  author_avatar TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read blog posts
CREATE POLICY "Public read access" ON public.blog_posts
  FOR SELECT USING (true);

-- No public write access (writes go through edge function with service role)
CREATE POLICY "No public write" ON public.blog_posts
  FOR INSERT WITH CHECK (false);

CREATE POLICY "No public update" ON public.blog_posts
  FOR UPDATE USING (false);

CREATE POLICY "No public delete" ON public.blog_posts
  FOR DELETE USING (false);

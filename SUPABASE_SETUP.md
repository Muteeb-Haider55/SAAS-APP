# Supabase Database Setup

## Required Tables

Your application expects the following tables in Supabase:

### 1. `companions` table

```sql
CREATE TABLE companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  voice TEXT NOT NULL,
  style TEXT NOT NULL,
  duration INTEGER NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access
CREATE POLICY "Allow public read access" ON companions
  FOR SELECT USING (true);

-- Policy to allow authenticated users to insert their own companions
CREATE POLICY "Allow authenticated insert" ON companions
  FOR INSERT WITH CHECK (auth.uid()::text = author);
```

### 2. `session_history` table

```sql
CREATE TABLE session_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE session_history ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access
CREATE POLICY "Allow public read access" ON session_history
  FOR SELECT USING (true);

-- Policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON session_history
  FOR INSERT WITH CHECK (true);
```

### 3. `bookmarks` table

```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(companion_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own bookmarks
CREATE POLICY "Users can read own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid()::text = user_id);

-- Policy to allow users to insert their own bookmarks
CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Policy to allow users to delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid()::text = user_id);
```

## Setup Instructions

1. Go to your Supabase project: https://dnuoshqyxfmjjftzbpiz.supabase.co
2. Click on "SQL Editor" in the left sidebar
3. Copy and paste each table creation SQL above
4. Click "Run" to execute each one

## Clerk + Supabase Integration (Optional)

If you want to use Clerk authentication with Supabase RLS:

1. In Clerk Dashboard → JWT Templates → Create a new template named "supabase"
2. Use the Supabase template provided by Clerk
3. Update the RLS policies to use Clerk's JWT claims

For now, the app will work with anonymous access (using the anon key) if the JWT template is not configured.

## Troubleshooting

### Error: "relation 'companions' does not exist"

- You haven't created the tables yet. Run the SQL above in Supabase SQL Editor.

### Error: "row-level security policy violation"

- Your RLS policies are too restrictive. For development, you can disable RLS or make policies more permissive.
- To disable RLS (DEVELOPMENT ONLY): `ALTER TABLE companions DISABLE ROW LEVEL SECURITY;`

### Error: "fetch failed" or network errors

- Check that your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Make sure your Supabase project is not paused
- Check your network/firewall isn't blocking requests to Supabase

## Seeding Sample Data (Optional)

```sql
INSERT INTO companions (name, subject, topic, voice, style, duration, author) VALUES
  ('Neura the Brainy Explorer', 'science', 'Neural Network of the Brain', 'female', 'casual', 45, 'system'),
  ('Countsy the Number Wizard', 'maths', 'Derivatives & Integrals', 'male', 'formal', 30, 'system'),
  ('Verba the Vocabulary Builder', 'language', 'English Literature', 'female', 'formal', 30, 'system');
```

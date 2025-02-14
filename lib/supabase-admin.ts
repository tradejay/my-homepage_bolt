import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);

export const executeMigrations = async () => {
  const migrations = [
    {
      name: 'broad_base',
      sql: `
        -- Create posts table
        CREATE TABLE IF NOT EXISTS posts (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          title text NOT NULL,
          content text NOT NULL,
          category text NOT NULL,
          subcategory text,
          created_at timestamptz DEFAULT now(),
          updated_at timestamptz DEFAULT now(),
          author_id uuid REFERENCES auth.users(id)
        );

        -- Create profiles table
        CREATE TABLE IF NOT EXISTS profiles (
          id uuid PRIMARY KEY REFERENCES auth.users(id),
          name text,
          avatar_url text,
          created_at timestamptz DEFAULT now()
        );

        -- Enable RLS
        ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

        -- Create policies for posts
        CREATE POLICY "Anyone can read posts"
          ON posts
          FOR SELECT
          TO public
          USING (true);

        CREATE POLICY "Authenticated users can create posts"
          ON posts
          FOR INSERT
          TO authenticated
          WITH CHECK (auth.uid() = author_id);

        CREATE POLICY "Users can update their own posts"
          ON posts
          FOR UPDATE
          TO authenticated
          USING (auth.uid() = author_id)
          WITH CHECK (auth.uid() = author_id);

        -- Create policies for profiles
        CREATE POLICY "Anyone can read profiles"
          ON profiles
          FOR SELECT
          TO public
          USING (true);

        CREATE POLICY "Users can update their own profile"
          ON profiles
          FOR UPDATE
          TO authenticated
          USING (auth.uid() = id)
          WITH CHECK (auth.uid() = id);

        CREATE POLICY "Users can insert their own profile"
          ON profiles
          FOR INSERT
          TO authenticated
          WITH CHECK (auth.uid() = id);
      `
    },
    {
      name: 'billowing_haze',
      sql: `
        -- Create filters table
        CREATE TABLE IF NOT EXISTS filters (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name text NOT NULL,
          category text NOT NULL,
          created_at timestamptz DEFAULT now()
        );

        -- Create sorts table
        CREATE TABLE IF NOT EXISTS sorts (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name text NOT NULL,
          category text NOT NULL,
          created_at timestamptz DEFAULT now()
        );

        -- Create roles table
        CREATE TABLE IF NOT EXISTS roles (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name text NOT NULL,
          permissions jsonb NOT NULL DEFAULT '{}',
          created_at timestamptz DEFAULT now()
        );

        -- Enable RLS
        ALTER TABLE filters ENABLE ROW LEVEL SECURITY;
        ALTER TABLE sorts ENABLE ROW LEVEL SECURITY;
        ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

        -- Create policies for filters
        CREATE POLICY "Anyone can read filters"
          ON filters
          FOR SELECT
          TO public
          USING (true);

        CREATE POLICY "Only authenticated users can create filters"
          ON filters
          FOR INSERT
          TO authenticated
          WITH CHECK (true);

        -- Create policies for sorts
        CREATE POLICY "Anyone can read sorts"
          ON sorts
          FOR SELECT
          TO public
          USING (true);

        CREATE POLICY "Only authenticated users can create sorts"
          ON sorts
          FOR INSERT
          TO authenticated
          WITH CHECK (true);

        -- Create policies for roles
        CREATE POLICY "Anyone can read roles"
          ON roles
          FOR SELECT
          TO public
          USING (true);

        CREATE POLICY "Only authenticated users can manage roles"
          ON roles
          FOR ALL
          TO authenticated
          USING (true)
          WITH CHECK (true);
      `
    },
    {
      name: 'orange_torch',
      sql: `
        -- Add sample data
        INSERT INTO posts (title, content, category, author_id)
        VALUES 
          ('Latest Advances in Medical Research', 'Exploring recent breakthroughs in medical science...', 'medical', '00000000-0000-0000-0000-000000000000'),
          ('New Pharmaceutical Developments', 'Recent developments in drug research...', 'pharmaceutical', '00000000-0000-0000-0000-000000000000'),
          ('Innovations in Medical Devices', 'Latest innovations in medical technology...', 'medical-devices', '00000000-0000-0000-0000-000000000000'),
          ('Trends in Cosmetics Industry', 'Current trends shaping the cosmetics industry...', 'cosmetics', '00000000-0000-0000-0000-000000000000'),
          ('Health Supplements Market Analysis', 'Analysis of the health supplements market...', 'health-supplements', '00000000-0000-0000-0000-000000000000'),
          ('Digital Healthcare Solutions', 'Emerging trends in digital healthcare...', 'digital-healthcare', '00000000-0000-0000-0000-000000000000');
      `
    },
    {
      name: 'polished_desert',
      sql: `
        -- Temporarily disable RLS to modify data
        ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

        -- Remove the foreign key constraint
        ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

        -- Add index for category column
        CREATE INDEX IF NOT EXISTS posts_category_idx ON posts(category);

        -- Update existing sample data to use NULL author_id
        UPDATE posts SET author_id = NULL;

        -- Add new constraint that allows NULL
        ALTER TABLE posts ADD CONSTRAINT posts_author_id_fkey 
          FOREIGN KEY (author_id) REFERENCES auth.users(id) 
          ON DELETE SET NULL;

        -- Re-enable RLS
        ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
      `
    }
  ];

  for (const migration of migrations) {
    const { error } = await supabaseAdmin.rpc('exec', { sql: migration.sql });
    if (error) {
      console.error(`Error executing migration ${migration.name}:`, error);
      throw error;
    }
    console.log(`Successfully executed migration: ${migration.name}`);
  }
};

export { supabaseAdmin };
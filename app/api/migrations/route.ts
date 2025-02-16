import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    // Check if table exists
    const { error: tableError } = await supabaseAdmin
      .from('calendar_events')
      .select('id')
      .limit(1);

    if (tableError?.code === 'PGRST204') {
      // Create table using rpc
      const { error: createError } = await supabaseAdmin.rpc('create_calendar_events_table', {
        sql_command: `
          CREATE TABLE IF NOT EXISTS calendar_events (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            title text NOT NULL,
            start_date timestamptz NOT NULL,
            end_date timestamptz NOT NULL,
            description text,
            calendar_type text NOT NULL CHECK (calendar_type IN ('monthly', 'weekly')),
            user_id uuid REFERENCES auth.users(id),
            google_event_id text,
            created_at timestamptz DEFAULT now(),
            updated_at timestamptz DEFAULT now()
          );

          -- Enable RLS
          ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

          -- Create policies
          CREATE POLICY "Users can view their own events"
            ON calendar_events
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);

          CREATE POLICY "Users can create their own events"
            ON calendar_events
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = user_id);

          CREATE POLICY "Users can update their own events"
            ON calendar_events
            FOR UPDATE
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);

          CREATE POLICY "Users can delete their own events"
            ON calendar_events
            FOR DELETE
            TO authenticated
            USING (auth.uid() = user_id);
        `
      });

      if (createError) {
        throw createError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
import { supabase } from './supabase';

export async function isAdmin(userId: string | undefined): Promise<boolean> {
  if (!userId) return false;

  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return false;
  }

  return true;
}
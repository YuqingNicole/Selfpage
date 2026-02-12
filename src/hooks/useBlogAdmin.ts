import { useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export function useBlogAdmin(getPassword: () => string) {
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const savePost = async (post: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/blog-admin?action=upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'x-admin-password': getPassword(),
        },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      toast.success('已保存');
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-post'] });
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error(message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/blog-admin?action=delete&id=${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': supabaseKey,
          'x-admin-password': getPassword(),
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }
      toast.success('已删除');
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const verifyPassword = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/blog-admin?action=upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'x-admin-password': password,
        },
        body: JSON.stringify({}),
      });
      // 401 means wrong password, other errors are ok (means password is correct but payload invalid)
      return res.status !== 401;
    } catch {
      return false;
    }
  };

  return { saving, savePost, deletePost, verifyPassword };
}

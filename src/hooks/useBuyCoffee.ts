import { useState } from 'react';
import { toast } from 'sonner';

export function useBuyCoffee() {
  const [loading, setLoading] = useState(false);

  const handleBuyCoffee = async () => {
    setLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (!supabaseUrl || !supabaseKey) throw new Error('Backend not ready');
      const res = await fetch(`${supabaseUrl}/functions/v1/create-coffee-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleBuyCoffee };
}

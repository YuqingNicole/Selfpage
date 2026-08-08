'use client';

import { supabase } from '@/integrations/supabase/client';

/**
 * 学园埋点：匿名设备号 + 事件流，直接写入 Supabase learn_events 表。
 * 未配置 Supabase 时静默降级为 no-op，绝不影响主流程。
 */

const DEVICE_KEY = 'learn-device-id-v1';

const configured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder'),
);

function deviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return 'unknown';
  }
}

/** 关键漏斗事件；fire-and-forget，任何失败都吞掉 */
export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (!configured) {
    if (process.env.NODE_ENV === 'development') console.debug('[track]', event, props);
    return;
  }
  try {
    void supabase
      .from('learn_events')
      .insert({ device_id: deviceId(), event, props })
      .then(() => undefined);
  } catch {
    /* 埋点永不打扰用户 */
  }
}

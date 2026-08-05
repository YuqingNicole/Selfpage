'use client';

/**
 * 期权学园音效：WebAudio 合成，零音频资源。
 * 全部音效在用户手势后才创建 AudioContext，静音状态存 localStorage。
 */

const MUTE_KEY = 'options-course-muted-v1';

let ctx: AudioContext | null = null;
let muted: boolean | null = null;

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function isMuted(): boolean {
  if (muted === null) {
    try {
      muted = localStorage.getItem(MUTE_KEY) === '1';
    } catch {
      muted = false;
    }
  }
  return muted;
}

export function setMuted(m: boolean) {
  muted = m;
  try {
    localStorage.setItem(MUTE_KEY, m ? '1' : '0');
  } catch {
    /* ignore */
  }
}

function tone(
  freq: number,
  startDelay: number,
  duration: number,
  type: OscillatorType = 'sine',
  peak = 0.12,
) {
  if (isMuted()) return;
  const ac = audio();
  if (!ac) return;
  try {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const t0 = ac.currentTime + startDelay;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(peak, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
  } catch {
    /* ignore */
  }
}

export const sfx = {
  /** 答对：双音上行，连击越长音调越高（封顶 +7 半音） */
  correct(combo = 0) {
    const shift = Math.pow(2, Math.min(combo, 7) / 12);
    tone(660 * shift, 0, 0.12, 'sine');
    tone(880 * shift, 0.09, 0.16, 'sine');
  },
  /** 答错：低频锯齿双降 */
  wrong() {
    tone(220, 0, 0.18, 'sawtooth', 0.08);
    tone(180, 0.14, 0.22, 'sawtooth', 0.08);
  },
  /** 完成一课 */
  complete() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.18, 'triangle'));
  },
  /** 完美通关：更长的号角 */
  perfect() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, 0.22, 'triangle', 0.14));
    tone(1568, 0.5, 0.4, 'triangle', 0.12);
  },
  /** 赚钱周：金币声 */
  coin() {
    tone(988, 0, 0.08, 'square', 0.07);
    tone(1319, 0.07, 0.18, 'square', 0.07);
  },
  /** 爆仓 / Boss 反击：下坠轰鸣 */
  crash() {
    tone(300, 0, 0.3, 'sawtooth', 0.1);
    tone(200, 0.15, 0.35, 'sawtooth', 0.1);
    tone(120, 0.3, 0.5, 'sawtooth', 0.12);
  },
  /** 解锁徽章 */
  badge() {
    [784, 988, 1175, 1568].forEach((f, i) => tone(f, i * 0.07, 0.15, 'sine', 0.1));
  },
};

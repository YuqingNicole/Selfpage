'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * 投资学园吉祥物：猫头鹰分析师「查理」。
 * 纯 SVG 手绘，蓝色系 + 金色单边镜；四种表情覆盖产品的关键情绪场景。
 */

export type MascotMood = 'happy' | 'think' | 'sad' | 'celebrate';

const INK = '#25333e';
const BODY = '#2fb3f0';
const BODY_DARK = '#1d86c4';
const FACE = '#ffffff';
const BELLY = '#e8f6ff';
const GOLD = '#ffc800';
const ORANGE = '#ff9600';
const GREEN = '#58cc02';

export function Mascot({
  mood = 'happy',
  size = 96,
  bob = true,
  className = '',
}: {
  mood?: MascotMood;
  size?: number;
  /** 轻微上下浮动的待机动画 */
  bob?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const celebrate = mood === 'celebrate';

  return (
    <motion.div
      animate={!reduce && bob ? { y: [0, -5, 0] } : undefined}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        {/* 耳羽 */}
        <path d="M64 46 L76 62 L56 64 Z" fill={BODY_DARK} />
        <path d="M136 46 L144 64 L124 62 Z" fill={BODY_DARK} />

        {/* 翅膀：庆祝时高举 */}
        {celebrate ? (
          <>
            <ellipse cx="34" cy="92" rx="15" ry="32" fill={BODY_DARK} transform="rotate(38 34 92)" />
            <ellipse cx="166" cy="92" rx="15" ry="32" fill={BODY_DARK} transform="rotate(-38 166 92)" />
          </>
        ) : (
          <>
            <ellipse cx="41" cy="132" rx="15" ry="32" fill={BODY_DARK} transform="rotate(14 41 132)" />
            <ellipse cx="159" cy="132" rx="15" ry="32" fill={BODY_DARK} transform="rotate(-14 159 132)" />
          </>
        )}

        {/* 身体与肚皮 */}
        <ellipse cx="100" cy="118" rx="62" ry="64" fill={BODY} />
        <ellipse cx="100" cy="148" rx="38" ry="27" fill={BELLY} />

        {/* 小领结（品牌绿） */}
        <path d="M100 128 L84 120 L84 136 Z" fill={GREEN} />
        <path d="M100 128 L116 120 L116 136 Z" fill={GREEN} />
        <circle cx="100" cy="128" r="4.5" fill="#46a302" />

        {/* 面部圆盘 */}
        <circle cx="74" cy="92" r="26" fill={FACE} />
        <circle cx="126" cy="92" r="26" fill={FACE} />

        {/* 眼睛（按表情切换） */}
        {mood === 'celebrate' ? (
          <>
            <path d="M60 94 Q74 80 88 94" stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M112 94 Q126 80 140 94" stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle
              cx={mood === 'think' ? 79 : 74}
              cy={mood === 'think' ? 87 : mood === 'sad' ? 97 : 92}
              r="9.5"
              fill={INK}
            />
            <circle
              cx={mood === 'think' ? 131 : 126}
              cy={mood === 'think' ? 87 : mood === 'sad' ? 97 : 92}
              r="9.5"
              fill={INK}
            />
            <circle cx={mood === 'think' ? 76 : 71} cy={mood === 'think' ? 84 : mood === 'sad' ? 94 : 89} r="3" fill="#fff" />
            <circle cx={mood === 'think' ? 128 : 123} cy={mood === 'think' ? 84 : mood === 'sad' ? 94 : 89} r="3" fill="#fff" />
          </>
        )}

        {/* 眉毛：思考=单挑眉，沮丧=八字眉 */}
        {mood === 'think' && (
          <path d="M60 68 Q74 60 88 66" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
        )}
        {mood === 'sad' && (
          <>
            <path d="M60 70 Q74 76 88 72" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M112 72 Q126 76 140 70" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* 金色单边镜（分析师の证）+ 镜链 */}
        <circle cx="126" cy="92" r="27" stroke={GOLD} strokeWidth="5" fill="none" />
        <path d="M128 119 q8 12 2 24" stroke={GOLD} strokeWidth="3" fill="none" />
        <circle cx="130" cy="145" r="3.5" fill={GOLD} />

        {/* 喙：庆祝时张开 */}
        {celebrate ? (
          <>
            <path d="M90 104 L110 104 L100 112 Z" fill={ORANGE} stroke={ORANGE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M92 110 Q100 122 108 110 Q100 116 92 110 Z" fill="#e07800" />
          </>
        ) : (
          <path
            d={mood === 'sad' ? 'M91 110 L109 110 L100 118 Z' : 'M90 105 L110 105 L100 118 Z'}
            fill={ORANGE}
            stroke={ORANGE}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        )}

        {/* 沮丧的汗滴 */}
        {mood === 'sad' && <path d="M52 66 q-7 12 0 16 q8 -4 0 -16" fill="#9fdcff" />}

        {/* 庆祝彩点 */}
        {celebrate && (
          <>
            <circle cx="28" cy="46" r="5" fill={GOLD} />
            <circle cx="172" cy="42" r="4" fill={GREEN} />
            <circle cx="158" cy="24" r="3.5" fill="#ff4b4b" />
            <circle cx="44" cy="24" r="3.5" fill="#ce82ff" />
          </>
        )}

        {/* 脚爪 */}
        <ellipse cx="82" cy="180" rx="11" ry="6" fill={ORANGE} />
        <ellipse cx="118" cy="180" rx="11" ry="6" fill={ORANGE} />
      </svg>
    </motion.div>
  );
}

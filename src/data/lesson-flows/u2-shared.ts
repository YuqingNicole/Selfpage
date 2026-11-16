import type { PayoffSliderStep } from '../optionsCourse';

/**
 * 第 2 单元共用的例子：XYZ 现价 $100。
 * - 行权价 $105 的 Call，权利金 $2/股（一张 $200）
 * - 行权价 $95 的 Put，权利金 $3/股（一张 $300）
 * 第 1、2 课站在买方，第 3 课站在卖方——交易的是同两张合约。
 */

type Legs = PayoffSliderStep['legs'];

export const LONG_CALL: Legs = [{ type: 'call', strike: 105, qty: 1 }];
export const LONG_PUT: Legs = [{ type: 'put', strike: 95, qty: 1 }];
export const SHORT_CALL: Legs = [{ type: 'call', strike: 105, qty: -1 }];
export const SHORT_PUT: Legs = [{ type: 'put', strike: 95, qty: -1 }];
export const STOCK_PLUS_PUT: Legs = [
  { type: 'stock', strike: 0, qty: 1 },
  { type: 'put', strike: 95, qty: 1 },
];

export const SHAPE_RANGE: [number, number] = [70, 130];

/** 四大基本仓位的迷你图选项（premium 为每股净支出，卖方为负） */
export const SHAPES = {
  longCall: { legs: LONG_CALL, premium: 2 },
  longPut: { legs: LONG_PUT, premium: 3 },
  shortCall: { legs: SHORT_CALL, premium: -2 },
  shortPut: { legs: SHORT_PUT, premium: -3 },
};

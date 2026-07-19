#!/usr/bin/env python3
"""拉取美股 11 个 GICS 板块 ETF + SPY 日线数据，计算板块轮动指标，输出 data.js。

用法:
    .venv/bin/python fetch_data.py

数据源: Yahoo Finance (yfinance)。输出: public/work/sector-rotation/data.js (window.SECTOR_DATA)。
"""
import json
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

import pandas as pd
import yfinance as yf

# 代码 -> (中文名, 风格分组: cyc=顺周期/进攻, def=防御)
SECTORS = {
    "XLK":  ("科技",       "cyc"),
    "XLC":  ("通信服务",   "cyc"),
    "XLY":  ("非必需消费", "cyc"),
    "XLF":  ("金融",       "cyc"),
    "XLI":  ("工业",       "cyc"),
    "XLB":  ("原材料",     "cyc"),
    "XLE":  ("能源",       "cyc"),
    "XLV":  ("医疗保健",   "def"),
    "XLP":  ("必需消费",   "def"),
    "XLU":  ("公用事业",   "def"),
    "XLRE": ("房地产",     "def"),
}
BENCH = "SPY"

# 交易日偏移 -> 展示名
HORIZONS = [(5, "1周"), (21, "1月"), (63, "3月"), (126, "6月"), (None, "YTD"), (252, "1年")]

RRG_WINDOW = 10   # JdK 风格标准化窗口(周)
RRG_TRAIL = 12    # RRG 轨迹周数
EXCESS_DAYS = 252 # 相对强度曲线长度(交易日)


def r2(x):
    return None if x is None or pd.isna(x) else round(float(x), 2)


def horizon_return(close: pd.Series, offset):
    """offset 为交易日数; None 表示 YTD。"""
    last = close.iloc[-1]
    if offset is None:
        prev_year = close.index.year[-1] - 1
        base = close[close.index.year == prev_year]
        if base.empty:
            return None
        return last / base.iloc[-1] - 1
    if len(close) <= offset:
        return None
    return last / close.iloc[-1 - offset] - 1


def zscore_to_100(s: pd.Series, win: int) -> pd.Series:
    m = s.rolling(win).mean()
    sd = s.rolling(win).std(ddof=0).replace(0, pd.NA)
    return 100 + 2 * (s - m) / sd  # ×2 仅放大视觉散布, 象限判定不变


def main():
    tickers = list(SECTORS) + [BENCH]
    print(f"下载 {len(tickers)} 只 ETF 近两年日线 ...")
    raw = yf.download(tickers, period="2y", interval="1d",
                      auto_adjust=True, progress=False, group_by="column")
    close = raw["Close"].dropna(how="any")
    if close.empty:
        sys.exit("下载失败: 无数据")

    asof = close.index[-1].strftime("%Y-%m-%d")
    spy = close[BENCH]

    # ---- 各周期收益 & 基本行情 ----
    sectors = []
    for tk, (name, group) in SECTORS.items():
        c = close[tk]
        rets = {label: r2(horizon_return(c, off) * 100) if horizon_return(c, off) is not None else None
                for off, label in HORIZONS}
        sectors.append({
            "ticker": tk,
            "name": name,
            "group": group,
            "price": r2(c.iloc[-1]),
            "day_chg": r2((c.iloc[-1] / c.iloc[-2] - 1) * 100),
            "returns": rets,
        })

    # ---- 相对 SPY 超额收益曲线(近一年, 起点归零) ----
    win = close.tail(EXCESS_DAYS + 1)
    cum = win / win.iloc[0] - 1
    dates = [d.strftime("%m-%d") for d in cum.index]
    excess = {}
    for tk in SECTORS:
        ex = (cum[tk] - cum[BENCH]) * 100
        excess[tk] = [r2(v) for v in ex]
    spy_cum = [r2(v * 100) for v in cum[BENCH]]

    # ---- RRG (周频, JdK 风格): x=RS-Ratio, y=RS-Momentum, 均以100为中心 ----
    wk = close.resample("W-FRI").last().dropna(how="any")
    rrg = {}
    for tk in SECTORS:
        rs = 100 * wk[tk] / wk[BENCH]
        ratio = zscore_to_100(rs, RRG_WINDOW)
        momentum = zscore_to_100(ratio, RRG_WINDOW)
        trail = pd.DataFrame({"x": ratio, "y": momentum}).dropna().tail(RRG_TRAIL)
        rrg[tk] = [[r2(r.x), r2(r.y), d.strftime("%m-%d")]
                   for d, r in trail.iterrows()]

    # ---- 顶部 KPI ----
    m1 = {s["ticker"]: s["returns"]["1月"] for s in sectors if s["returns"]["1月"] is not None}
    by_tk = {s["ticker"]: s for s in sectors}
    best_tk, worst_tk = max(m1, key=m1.get), min(m1, key=m1.get)
    cyc = [m1[t] for t, (_, g) in SECTORS.items() if g == "cyc" and t in m1]
    dfn = [m1[t] for t, (_, g) in SECTORS.items() if g == "def" and t in m1]
    risk_spread = sum(cyc) / len(cyc) - sum(dfn) / len(dfn)
    spy_1m = r2(horizon_return(spy, 21) * 100)
    dispersion = pd.Series(list(m1.values())).std(ddof=0)
    beat_spy = sum(1 for v in m1.values() if v > spy_1m)

    data = {
        "asof": asof,
        "generated": datetime.now(timezone(timedelta(hours=8))).strftime("%Y-%m-%d %H:%M"),
        "spy": {"price": r2(spy.iloc[-1]),
                "day_chg": r2((spy.iloc[-1] / spy.iloc[-2] - 1) * 100),
                "returns": {label: (r2(horizon_return(spy, off) * 100)
                                    if horizon_return(spy, off) is not None else None)
                            for off, label in HORIZONS}},
        "horizons": [label for _, label in HORIZONS],
        "sectors": sectors,
        "kpi": {
            "best":  {"ticker": best_tk, "name": by_tk[best_tk]["name"], "ret": m1[best_tk]},
            "worst": {"ticker": worst_tk, "name": by_tk[worst_tk]["name"], "ret": m1[worst_tk]},
            "risk_spread": r2(risk_spread),
            "dispersion": r2(dispersion),
            "beat_spy": beat_spy,
            "total": len(SECTORS),
        },
        "excess": {"dates": dates, "spy_cum": spy_cum, "series": excess},
        "rrg": rrg,
    }

    out = Path(__file__).resolve().parents[2] / "public" / "work" / "sector-rotation" / "data.js"
    with open(out, "w", encoding="utf-8") as f:
        f.write("// 由 fetch_data.py 生成, 请勿手改\n")
        f.write("window.SECTOR_DATA = ")
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print(f"OK -> {out}  截至 {asof}  领涨 {by_tk[best_tk]['name']} {m1[best_tk]:+.1f}%  "
          f"领跌 {by_tk[worst_tk]['name']} {m1[worst_tk]:+.1f}%")


if __name__ == "__main__":
    main()

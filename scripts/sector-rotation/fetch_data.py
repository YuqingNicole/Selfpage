#!/usr/bin/env python3
"""拉取美股 11 个 GICS 板块 ETF + SPY 日线数据，计算板块轮动指标，输出 data.js。

同时抓取各板块代表个股与相关 ETF 的行情(价格/日涨跌/近1月/量比)，供板块详情弹层使用。

用法:
    .venv/bin/python fetch_data.py

数据源:
  - 主力: Yahoo Finance (yfinance) — 历史日线、基本面
  - 可选: ARTI Data API — 补充实时技术指标 (RSI/MACD/BOLL/KDJ/ATR)
    设置环境变量 ARTI_BASE_URL 和 ARTI_API_KEY 后自动启用。

输出: public/work/sector-rotation/data.js (window.SECTOR_DATA)。
"""
import json
import os
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

import pandas as pd
import yfinance as yf

# ---- ARTI Data API (可选) ----
ARTI_BASE_URL = os.getenv("ARTI_BASE_URL", "").rstrip("/")
ARTI_API_KEY  = os.getenv("ARTI_API_KEY", "")
ARTI_ENABLED  = bool(ARTI_BASE_URL and ARTI_API_KEY)


def arti_get(path: str) -> dict:
    """GET ARTI endpoint, return parsed body or {}. Never raises."""
    if not ARTI_ENABLED:
        return {}
    try:
        import urllib.request
        req = urllib.request.Request(
            ARTI_BASE_URL + path,
            headers={"X-Internal-Key": ARTI_API_KEY},
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = json.loads(resp.read())
        return body if body.get("ok") else {}
    except Exception:
        return {}


def arti_technicals(ticker: str) -> dict:
    """Return ARTI technicals dict for a US ticker, or {} if unavailable."""
    body = arti_get(f"/internal/market/technicals/{ticker}")
    d = body.get("data") or {}
    if not d:
        return {}
    out = {}
    # scalars
    for k in ("rsi6", "rsi14", "atr14"):
        if d.get(k) is not None:
            out[k] = r2(d[k])
    # nested objects
    for obj_key in ("macd", "boll", "kdj"):
        obj = d.get(obj_key)
        if isinstance(obj, dict):
            out[obj_key] = {k: r2(v) for k, v in obj.items() if v is not None}
    return out


def arti_quote(ticker: str) -> dict:
    """Return ARTI real-time quote fields for a US ticker, or {}."""
    body = arti_get(f"/internal/market/quote/{ticker}")
    d = body.get("data") or {}
    if not d or d.get("market") != "US":
        return {}
    return {
        "d_open":  r2(d.get("open")),
        "d_high":  r2(d.get("high")),
        "d_low":   r2(d.get("low")),
        "prev_c":  r2(d.get("prev_close")),
    }


def arti_indicator(ticker: str) -> dict:
    """Return ARTI financial indicator (latest period) for a US ticker, or {}."""
    body = arti_get(f"/internal/market/financial-reports/{ticker}?report_type=indicator&limit=1")
    rows = body.get("data") or []
    if not rows or not isinstance(rows, list):
        return {}
    d = rows[0]
    def f(k):
        v = d.get(k)
        return r2(float(v)) if v not in (None, "") else None
    return {
        "a_eps":       f("basic_eps"),
        "a_eps_d":     f("diluted_eps"),
        "a_gross_m":   f("gross_profit_ratio"),   # %
        "a_net_m":     f("net_profit_ratio"),      # %
        "a_roe":       f("roe_avg"),               # %
        "a_roa":       f("roa"),                   # %
        "a_cr":        f("current_ratio"),
        "a_qr":        f("quick_ratio"),
        "a_debt_r":    f("debt_asset_ratio"),      # %
        "a_rev":       f("operate_income"),        # 营收 (元)
        "a_gross":     f("gross_profit"),
        "a_net":       f("parent_holder_netprofit"),
        "a_end_date":  d.get("end_date"),
    }


def arti_profile(ticker: str) -> dict:
    """Return ARTI company profile extras, or {}."""
    body = arti_get(f"/internal/market/company-profile/{ticker}")
    d = body.get("data") or {}
    if not d or d.get("market") != "US":
        return {}
    return {
        "a_exchange":  d.get("exchange"),
        "a_list_date": d.get("list_date"),
        "a_currency":  d.get("currency"),
    }

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

# 各板块代表个股 (代码, 中文名) —— 静态清单, 行情每日自动更新
STOCKS = {
    "XLK": [
        ("AAPL","苹果"),("MSFT","微软"),("NVDA","英伟达"),("AVGO","博通"),
        ("ORCL","甲骨文"),("CRM","赛富时"),("AMD","超微半导体"),("CSCO","思科"),
        ("INTC","英特尔"),("QCOM","高通"),("TXN","德州仪器"),("ADBE","Adobe"),
        ("NOW","ServiceNow"),("INTU","Intuit"),("MU","美光科技"),("AMAT","应用材料"),
        ("PANW","Palo Alto"),("CRWD","CrowdStrike"),("PLTR","Palantir"),("ACN","埃森哲"),
        ("LRCX","泛林集团"),("KLAC","科磊半导体"),("SNPS","新思科技"),("CDNS","楷登电子"),
        ("ANET","Arista Networks"),("DELL","戴尔"),("HPE","惠普企业"),("FTNT","Fortinet"),
        # AI 供应链补充
        ("TSM","台积电"),("ARM","ARM Holdings"),("ASML","ASML"),
        ("MRVL","Marvell Technology"),("CIEN","Ciena"),
        ("LITE","Lumentum"),("COHR","Coherent"),("CRDO","Credo Technology"),
        ("SMCI","超微电脑"),
        ("TER","泰瑞达"),("WDC","西部数据"),("STX","希捷"),
        ("AMKR","安靠科技"),("UMC","联华电子"),
        ("SNOW","Snowflake"),("DDOG","Datadog"),
    ],
    "XLC": [
        ("GOOGL","谷歌"),("META","Meta"),("NFLX","奈飞"),("DIS","迪士尼"),
        ("TMUS","T-Mobile"),("VZ","威瑞森"),("T","美国电话电报"),("CMCSA","康卡斯特"),
        ("CHTR","Charter通信"),("WBD","华纳兄弟探索"),("SNAP","Snap"),("PINS","Pinterest"),
        ("EA","艺电"),("SPOT","Spotify"),("MTCH","Match集团"),("RBLX","Roblox"),
    ],
    "XLY": [
        ("AMZN","亚马逊"),("TSLA","特斯拉"),("HD","家得宝"),("MCD","麦当劳"),
        ("NKE","耐克"),("BKNG","Booking"),("LOW","劳氏"),("SBUX","星巴克"),
        ("TGT","塔吉特"),("GM","通用汽车"),("F","福特"),("EXPE","Expedia"),
        ("TJX","TJX公司"),("ROST","罗斯百货"),("CMG","Chipotle"),("YUM","百胜餐饮"),
        ("MAR","万豪国际"),("HLT","希尔顿"),("ORLY","O'Reilly汽配"),("AZO","AutoZone"),
        ("DHI","DR Horton"),("LEN","莱纳房屋"),("PHM","Pulte Group"),("CCL","嘉年华邮轮"),
    ],
    "XLF": [
        ("BRK-B","伯克希尔"),("JPM","摩根大通"),("V","Visa"),("MA","万事达"),
        ("BAC","美国银行"),("WFC","富国银行"),("GS","高盛"),("MS","摩根士丹利"),
        ("C","花旗集团"),("AXP","美国运通"),("BLK","贝莱德"),("SCHW","嘉信理财"),
        ("COF","Capital One"),("PNC","PNC金融"),("SPGI","标普全球"),("MCO","穆迪"),
        ("CME","芝商所"),("ICE","洲际交易所"),("PYPL","PayPal"),("FIS","Fidelity National"),
        ("FISV","Fiserv"),("USB","美国合众银行"),("TFC","Truist金融"),("CB","Chubb"),
    ],
    "XLI": [
        ("GE","通用电气"),("RTX","雷神技术"),("CAT","卡特彼勒"),("BA","波音"),
        ("HON","霍尼韦尔"),("UNP","联合太平洋"),("UPS","联合包裹"),("DE","迪尔"),
        ("LMT","洛克希德马丁"),("NOC","诺思罗普格鲁曼"),("GD","通用动力"),("MMM","3M"),
        ("ETN","伊顿"),("FDX","联邦快递"),("NSC","诺福克南方"),("WM","废物管理"),
        ("CARR","开利全球"),("OTIS","奥的斯"),("ROK","罗克韦尔自动化"),("PH","派克汉尼汾"),
        ("EMR","艾默生电气"),("CSX","CSX铁路"),("AME","安福集团"),("VRSK","Verisk"),
        # AI 基础设施电力/冷却相关
        ("VRT","Vertiv"),("NVT","nVent Electric"),("HUBB","Hubbell"),
        ("PWR","Quanta Services"),("TT","特灵科技"),
    ],
    "XLB": [
        ("LIN","林德"),("SHW","宣伟"),("FCX","自由港麦克莫兰"),("NEM","纽蒙特"),
        ("NUE","纽柯钢铁"),("DOW","陶氏"),("DD","杜邦"),("APD","空气化工"),
        ("ECL","艺康"),("PPG","PPG工业"),("ALB","雅保/锂业"),("GOLD","巴里克黄金"),
        ("VMC","火神材料"),("MLM","Martin Marietta"),("CF","CF工业"),("MOS","美盛"),
    ],
    "XLE": [
        ("XOM","埃克森美孚"),("CVX","雪佛龙"),("COP","康菲石油"),("SLB","斯伦贝谢"),
        ("EOG","EOG资源"),("MPC","马拉松石油"),("PSX","菲利普66"),("OXY","西方石油"),
        ("HAL","哈里伯顿"),("DVN","戴文能源"),("VLO","瓦莱罗能源"),("WMB","威廉姆斯"),
        ("KMI","金德摩根"),("BKR","贝克休斯"),("FANG","钻石后背"),
    ],
    "XLV": [
        ("LLY","礼来"),("UNH","联合健康"),("JNJ","强生"),("ABBV","艾伯维"),
        ("MRK","默克"),("TMO","赛默飞"),("ABT","雅培"),("PFE","辉瑞"),
        ("BMY","百时美施贵宝"),("AMGN","安进"),("GILD","吉利德"),("REGN","再生元"),
        ("VRTX","福泰制药"),("ISRG","直觉外科"),("DHR","丹纳赫"),("MDT","美敦力"),
        ("ELV","Elevance Health"),("CVS","CVS健康"),("HUM","人本医疗"),("CI","信诺"),
        ("BSX","波士顿科学"),("EW","爱德华兹生命科学"),("DXCM","德康医疗"),("ZTS","硕腾"),
    ],
    "XLP": [
        ("WMT","沃尔玛"),("COST","好市多"),("PG","宝洁"),("KO","可口可乐"),
        ("PEP","百事"),("PM","菲利普莫里斯"),("MO","奥驰亚"),("CL","高露洁"),
        ("MDLZ","亿滋国际"),("KHC","卡夫亨氏"),("GIS","通用磨坊"),("HSY","好时"),
        ("KR","克罗格"),("STZ","星座品牌"),("SYY","西斯科"),("CHD","Church & Dwight"),
    ],
    "XLU": [
        ("NEE","新纪元能源"),("SO","南方电力"),("DUK","杜克能源"),("CEG","星座能源"),
        ("VST","维斯特拉"),("SRE","桑普拉能源"),("AEP","美国电力"),("EXC","爱克斯龙"),
        ("ED","Consolidated Edison"),("D","多米尼能源"),("WEC","WEC能源"),
        ("AWK","美国水务"),("PCG","太平洋燃气电力"),("XEL","萨诺科能源"),("ETR","安特吉"),
    ],
    "XLRE":[
        ("PLD","安博"),("AMT","美国铁塔"),("EQIX","Equinix"),("WELL","Welltower"),
        ("SPG","西蒙地产"),("O","Realty Income"),("DLR","数字地产"),("CCI","冠城国际"),
        ("PSA","公共储存"),("EXR","Extra Space储存"),("VICI","VICI地产"),
        ("AVB","Avalon Bay"),("EQR","股权住宅"),("IRM","铁山"),("VTR","Ventas"),
        # AI 算力基础设施运营商
        ("CRWV","CoreWeave"),("NBIS","Nebius"),
        ("IREN","Iris Energy"),("APLD","Applied Digital"),("TLN","Talen Energy"),
    ],
}

# 各板块相关 ETF (代码, 中文名)
ETFS = {
    "XLK": [("SMH","VanEck半导体"),("SOXX","iShares半导体"),("IGV","iShares软件"),("TECL","Direxion三倍科技")],
    "XLC": [("FDN","First Trust互联网"),("IYZ","iShares电信"),("SOCL","Global X社交媒体")],
    "XLY": [("XRT","SPDR零售"),("XHB","SPDR住宅建筑"),("FDIS","富达非必需消费")],
    "XLF": [("KBE","SPDR银行"),("KRE","SPDR地区银行"),("IAI","iShares券商"),("KIE","SPDR保险")],
    "XLI": [("ITA","iShares航空军工"),("XAR","SPDR航空军工"),("IYT","iShares交通运输")],
    "XLB": [("GDX","VanEck金矿"),("XME","SPDR金属采矿"),("COPX","Global X铜矿"),("MOO","VanEck农业")],
    "XLE": [("XOP","SPDR油气勘探"),("OIH","VanEck油服"),("AMLP","Alerian管道MLP"),("UCO","ProShares两倍原油")],
    "XLV": [("IBB","iShares生物科技"),("XBI","SPDR生物科技"),("IHI","iShares医疗器械"),("IHF","iShares医疗服务")],
    "XLP": [("PBJ","Invesco食品饮料"),("FSTA","富达必需消费"),("RHS","Invesco等权必需消费"),("KXI","iShares全球必需消费")],
    "XLU": [("GRID","First Trust电网"),("FUTY","富达公用事业"),("JXI","iShares全球公用事业"),("NLR","VanEck铀矿核电")],
    "XLRE":[("IYR","iShares美国房地产"),("VNQ","Vanguard房地产"),("REM","iShares抵押REIT"),("SRVR","Pacer数据中心REIT")],
}

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


def fetch_ohlcv(tickers, period):
    """批量下载 OHLCV; Yahoo 偶发单只失败, 用 Ticker.history 单独重试至多两轮。
    返回 (raw MultiIndex DataFrame, 仍失败的 ticker 列表)。"""
    import time
    raw = yf.download(tickers, period=period, interval="1d",
                      auto_adjust=True, progress=False, group_by="column")

    def missing():
        if raw.empty:
            return list(tickers)
        c = raw["Close"]
        return [t for t in tickers if t not in c.columns or c[t].dropna().empty]

    for _ in range(2):
        miss = missing()
        if not miss:
            break
        time.sleep(3)
        for t in miss:
            try:
                h = yf.Ticker(t).history(period=period, auto_adjust=True)
            except Exception:
                continue
            if h.empty:
                continue
            h.index = h.index.tz_localize(None)
            for col in ("Open", "High", "Low", "Close", "Volume"):
                if col in h.columns and (col, t) in raw.columns:
                    raw.loc[h.index, (col, t)] = h[col]
            print(f"  单独重试成功: {t}")
    return raw, missing()


def main():
    tickers = list(SECTORS) + [BENCH]
    print(f"下载 {len(tickers)} 只 ETF 近两年日线 ...")
    raw, miss_core = fetch_ohlcv(tickers, "2y")
    if miss_core:
        sys.exit(f"下载失败: {','.join(miss_core)}")
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

    # ---- 板块详情: 近一年日线收盘价 (与 excess 同一时间窗) ----
    px = {tk: [r2(v) for v in win[tk]] for tk in SECTORS}

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

    # ---- 板块详情: 代表个股 & 相关 ETF 行情 ----
    extra = sorted({t for lst in list(STOCKS.values()) + list(ETFS.values()) for t, _ in lst})
    print(f"下载 {len(extra)} 只个股/相关 ETF 近两年日线 ...")
    eraw, _ = fetch_ohlcv(extra, "2y")
    eclose, ehigh, elow, evol = eraw["Close"], eraw["High"], eraw["Low"], eraw["Volume"]

    def quote(t):
        """-> 行情/技术指标字典; 数据缺失返回 None。"""
        if t not in eclose:
            return None
        c = eclose[t].dropna()
        if len(c) < 2:
            return None
        v = evol[t].dropna() if t in evol else pd.Series(dtype=float)
        vr = None
        if len(v):
            base = v.iloc[-21:-1] if len(v) > 21 else v.iloc[:-1]
            if len(base) and base.mean():
                vr = round(float(v.iloc[-1] / base.mean()), 2)

        def ret(n):
            return r2((c.iloc[-1] / c.iloc[-1 - n] - 1) * 100) if len(c) > n else None

        ytd = None
        base_y = c[c.index.year == c.index.year[-1] - 1]
        if not base_y.empty:
            ytd = r2((c.iloc[-1] / base_y.iloc[-1] - 1) * 100)

        def ma(n):
            return r2(c.tail(n).mean()) if len(c) >= n else None

        yr = c.tail(252)
        hi = ehigh[t].dropna().tail(252) if t in ehigh else pd.Series(dtype=float)
        lo = elow[t].dropna().tail(252) if t in elow else pd.Series(dtype=float)
        vola = None
        if len(yr) > 20:
            vola = r2(yr.pct_change().dropna().std(ddof=0) * (252 ** 0.5) * 100)
        return {"p": r2(c.iloc[-1]),
                "chg": ret(1), "w1": ret(5), "m1": ret(21), "m3": ret(63),
                "m6": ret(126), "ytd": ytd, "y1": ret(252),
                "vr": vr,
                "vol": int(v.iloc[-1]) if len(v) else None,
                "tvr": r2(c.iloc[-1] * v.iloc[-1]) if len(v) else None,
                "h52": r2(hi.max()) if len(hi) else None,
                "l52": r2(lo.min()) if len(lo) else None,
                "ma20": ma(20), "ma50": ma(50), "ma200": ma(200),
                "vola": vola,
                "hist": [r2(x) for x in yr]}

    # ---- 基本面 (.info, 尽力而为) ----
    print(f"抓取 {len(extra)} 只标的基本面 ...")
    etf_set = {t for lst in ETFS.values() for t, _ in lst}
    info_map = {}
    for i, t in enumerate(extra):
        try:
            inf = yf.Ticker(t).info or {}
        except Exception:
            inf = {}

        def num(k, scale=1):
            x = inf.get(k)
            return r2(x * scale) if isinstance(x, (int, float)) else None

        if t in etf_set:
            dy = num("yield", 100)
            if dy is None:
                dy = num("dividendYield")
        else:
            dy = num("dividendYield")
        info_map[t] = {
            "full": inf.get("longName"), "ind": inf.get("industry"),
            "mc": num("marketCap"), "aum": num("totalAssets"),
            "pe": num("trailingPE"), "fpe": num("forwardPE"), "pb": num("priceToBook"),
            "dy": num("dividendYield", 100) if t not in etf_set else (num("yield", 100) or num("dividendYield", 100)),
            "beta": num("beta"), "eps": num("trailingEps"),
            "pm": num("profitMargins", 100), "roe": num("returnOnEquity", 100),
            "tgt": num("targetMeanPrice"),
            # 成长性
            "rev":    num("totalRevenue"),
            "rev_g":  num("revenueGrowth", 100),
            "eg":     num("earningsGrowth", 100),
            "eg_q":   num("earningsQuarterlyGrowth", 100),
            "gross_m":num("grossMargins", 100),
            "op_m":   num("operatingMargins", 100),
            # 资产负债 / 现金流
            "fcf":    num("freeCashflow"),
            "ocf":    num("operatingCashflow"),
            "de":     num("debtToEquity"),
            "cr":     num("currentRatio"),
            # 估值倍数
            "peg":    num("pegRatio"),
            "ps":     num("priceToSalesTrailing12Months"),
            "ev_rev": num("enterpriseToRevenue"),
            "ev_ebitda": num("enterpriseToEbitda"),
            "bv":     num("bookValue"),
            # 分析师 & 市场情绪
            "rec":      inf.get("recommendationKey"),
            "rec_n":    inf.get("numberOfAnalystOpinions"),
            "rec_score":num("recommendationMean"),
            "short_r":  num("shortRatio"),
            "short_f":  num("shortPercentOfFloat", 100),
            "inst_pct": num("heldPercentInstitutions", 100),
            # 实时行情 (当日, 来自 .info)
            "cur_p":    num("currentPrice") or num("regularMarketPrice"),
            "d_open":   num("open"),
            "d_high":   num("dayHigh"),
            "d_low":    num("dayLow"),
            "prev_c":   num("previousClose"),
            "avg_vol10":int(inf["averageVolume10days"]) if isinstance(inf.get("averageVolume10days"), (int, float)) else None,
        }
        if (i + 1) % 30 == 0:
            print(f"  基本面 {i + 1}/{len(extra)}")

    # ---- ARTI 数据补充 (技术指标 + 财务指标 + 公司信息) ----
    arti_tech_map:    dict[str, dict] = {}
    arti_ind_map:     dict[str, dict] = {}
    arti_profile_map: dict[str, dict] = {}
    if ARTI_ENABLED:
        print(f"ARTI: 抓取 {len(extra)} 只标的 (技术/财务/公司信息) ...")
        for i, t in enumerate(extra):
            tech = arti_technicals(t)
            if tech:
                arti_tech_map[t] = tech
            ind = arti_indicator(t)
            if ind:
                arti_ind_map[t] = ind
            prof = arti_profile(t)
            if prof:
                arti_profile_map[t] = prof
            if (i + 1) % 50 == 0:
                print(f"  ARTI {i + 1}/{len(extra)}")
        print(f"  技术指标 {len(arti_tech_map)} · 财务指标 {len(arti_ind_map)} · 公司信息 {len(arti_profile_map)} 只")
    else:
        print("ARTI_BASE_URL/ARTI_API_KEY 未设置，跳过 ARTI 数据补充")

    def pack(lst):
        out = []
        for t, n in lst:
            q = quote(t)
            if q:
                entry = {"t": t, "n": n, **q, **info_map.get(t, {})}
                if t in arti_tech_map:
                    entry.update(arti_tech_map[t])
                if t in arti_ind_map:
                    # a_ 前缀字段: ARTI 财务指标 (覆盖或补充 yfinance)
                    entry.update(arti_ind_map[t])
                if t in arti_profile_map:
                    entry.update(arti_profile_map[t])
                out.append(entry)
        return out

    stocks = {tk: pack(lst) for tk, lst in STOCKS.items()}
    etfs = {tk: pack(lst) for tk, lst in ETFS.items()}
    hist_dates = [d.strftime("%m-%d") for d in eclose.index[-252:]]
    missing = [t for t in extra if quote(t) is None]
    if missing:
        print(f"警告: {len(missing)} 只无数据已跳过: {','.join(missing)}")

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
        "px": px,
        "rrg": rrg,
        "stocks": stocks,
        "etfs": etfs,
        "hist_dates": hist_dates,
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

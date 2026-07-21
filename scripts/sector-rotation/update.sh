#!/bin/bash
# 每日更新美股板块轮动看板数据 (由 launchd 调用, 也可手动执行)
cd "$(dirname "$0")"
# 加载本地 .env (ARTI_BASE_URL / ARTI_API_KEY 等)
[ -f .env ] && export $(grep -v '^#' .env | xargs)
echo "===== $(date '+%Y-%m-%d %H:%M:%S') =====" >> update.log
.venv/bin/python fetch_data.py >> update.log 2>&1

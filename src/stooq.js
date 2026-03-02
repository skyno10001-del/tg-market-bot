// src/stooq.js
// Stooq CSV: https://stooq.com/q/d/l/?s=SYMBOL&i=d  (daily)
// 예: https://stooq.com/q/d/l/?s=%5Espx&i=d

function parseCSVLine(line) {
  // Date,Open,High,Low,Close,Volume
  const [date, open, high, low, close, volume] = line.split(",");
  return {
    date,
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
    volume: Number(volume),
  };
}

export async function fetchLastDaily(symbol) {
  const url = `https://stooq.com/q/d/l/?s=${encodeURIComponent(symbol)}&i=d`;
  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error(`Stooq fetch failed (${res.status}) for ${symbol}`);
  }

  const text = await res.text();
  const lines = text
    .trim()
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length < 3) {
    throw new Error(`Not enough CSV rows for ${symbol}`);
  }

  // header + at least 2 rows
  const last = parseCSVLine(lines[lines.length - 1]);
  const prev = parseCSVLine(lines[lines.length - 2]);

  const change = last.close - prev.close;
  const changePct = prev.close ? (change / prev.close) * 100 : 0;

  return {
    symbol,
    date: last.date,
    close: last.close,
    prevClose: prev.close,
    change,
    changePct,
  };
}
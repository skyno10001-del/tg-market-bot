// src/format.js

function todayKST() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function signArrow(n) {
  if (n > 0) return "▲";
  if (n < 0) return "▼";
  return "→";
}

function fmt(n, digits = 2) {
  if (typeof n !== "number" || Number.isNaN(n)) return "-";
  return n.toFixed(digits);
}

export function buildMessage({ job, market }) {
  const d = todayKST();

  if (job === "overseas") {
    const spx = market?.spx;
    const ndx = market?.ndx;        // NASDAQ100
    const dji = market?.dji;
    const y10 = market?.y10;
    const usd_i = market?.usd_i;    // Dollar Index
    const usdkrw = market?.usdkrw;

    return [
      `🌎 <b>해외시장 요약</b> (${d})`,
      "",
      "📈 <b>지수(전일 대비)</b>",
      `▷ S&P500: ${fmt(spx?.close, 2)}  ${signArrow(spx?.change)} ${fmt(spx?.change, 2)} (${fmt(spx?.changePct, 2)}%)`,
      `▷ NASDAQ100: ${fmt(ndx?.close, 2)}  ${signArrow(ndx?.change)} ${fmt(ndx?.change, 2)} (${fmt(ndx?.changePct, 2)}%)`,
      `▷ DOW: ${fmt(dji?.close, 2)}  ${signArrow(dji?.change)} ${fmt(dji?.change, 2)} (${fmt(dji?.changePct, 2)}%)`,
      "",
      "💵 <b>금리·달러·환율</b>",
      `▷ 미 10년물: ${fmt(y10?.close, 3)}%  ${signArrow(y10?.change)} ${fmt(y10?.change, 3)} (${fmt(y10?.changePct, 2)}%)`,
      `▷ 달러인덱스(USD_I): ${fmt(usd_i?.close, 3)}  ${signArrow(usd_i?.change)} ${fmt(usd_i?.change, 3)} (${fmt(usd_i?.changePct, 2)}%)`,
      `▷ USD/KRW: ${fmt(usdkrw?.close, 2)}  ${signArrow(usdkrw?.change)} ${fmt(usdkrw?.change, 2)} (${fmt(usdkrw?.changePct, 2)}%)`,
      "",
      "🧠 <b>전략가 코멘트</b>",
      "▷ 지표는 방향, 타점은 패턴(눌림·수렴·돌파 ‘조건 충족’)에서.",
    ].join("\n");
  }

  if (job === "news") {
    const headlines = market?.headlines || [];
    const newsLines = headlines.map((h) => `▷ ${h.title}`);

    return [
      `🗞️ <b>주요뉴스 브리핑</b> (${d})`,
      "",
      "📰 <b>오늘의 주요 이슈</b>",
      ...(newsLines.length ? newsLines : ["▷ (뉴스 수집 실패)"]),
      "",
      "🧠 <b>전략가 한줄</b>",
      "▷ 뉴스는 재료, 타점은 패턴에서.",
    ].join("\n");
  }

  return [
    `ℹ️ <b>알림</b> (${d})`,
    `job=${job}`,
  ].join("\n");
}
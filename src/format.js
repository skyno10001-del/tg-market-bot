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
    const ixic = market?.ixic;
    const dji = market?.dji;
    const y10 = market?.y10;
    const dxy = market?.dxy;
    const usdkrw = market?.usdkrw;

    return [
      `🌎 <b>해외시장 요약</b> (${d})`,
      "",
      "📈 <b>지수(전일 대비)</b>",
      `▷ S&P500: ${fmt(spx?.close, 2)}  ${signArrow(spx?.change)} ${fmt(spx?.change, 2)} (${fmt(spx?.changePct, 2)}%)`,
      `▷ NASDAQ: ${fmt(ixic?.close, 2)}  ${signArrow(ixic?.change)} ${fmt(ixic?.change, 2)} (${fmt(ixic?.changePct, 2)}%)`,
      `▷ DOW: ${fmt(dji?.close, 2)}  ${signArrow(dji?.change)} ${fmt(dji?.change, 2)} (${fmt(dji?.changePct, 2)}%)`,
      "",
      "💵 <b>금리·달러·환율</b>",
      `▷ 미 10년물: ${fmt(y10?.close, 3)}%  ${signArrow(y10?.change)} ${fmt(y10?.change, 3)} (${fmt(y10?.changePct, 2)}%)`,
      `▷ 달러인덱스(DX.F): ${fmt(dxy?.close, 3)}  ${signArrow(dxy?.change)} ${fmt(dxy?.change, 3)} (${fmt(dxy?.changePct, 2)}%)`,
      `▷ USD/KRW: ${fmt(usdkrw?.close, 2)}  ${signArrow(usdkrw?.change)} ${fmt(usdkrw?.change, 2)} (${fmt(usdkrw?.changePct, 2)}%)`,
      "",
      "🧠 <b>전략가 코멘트</b>",
      "▷ 지표는 방향, 타점은 패턴(눌림·수렴·돌파 ‘조건 충족’)에서.",
    ].join("\n");
  }

  if (job === "news") {
    return [
      `🗞️ <b>주요뉴스 브리핑</b> (${d})`,
      "",
      "📰 <b>핵심 이슈 요약</b>",
      "▷ (예: 美 CPI 예상 상회 → 금리 부담 확대)",
      "▷ (예: 반도체 업황 개선 기대감 부각)",
      "▷ (예: 2차전지 변동성 확대)",
      "",
      "💡 <b>시장 해석</b>",
      "▷ 오늘은 지수보다 개별 수급 흐름이 중요.",
      "▷ 뉴스는 재료, 타점은 차트 패턴에서 확인.",
      "",
      "🎯 <b>체크 포인트</b>",
      "▷ 갭상승 추격 금지",
      "▷ 거래대금 동반 종목 위주 접근",
      "▷ 장 초반 방향성 확인 후 대응",
    ].join("\n");
  }

  return [
    `ℹ️ <b>알림</b> (${d})`,
    `job=${job}`,
  ].join("\n");
}
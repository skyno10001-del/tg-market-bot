function todayKST() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export function buildMessage({ job }) {
  const d = todayKST();

  if (job === "overseas") {
    return [
      `🌎 <b>해외시장 요약</b> (${d})`,
      "",
      "▷ 나스닥 / S&P500 / 다우: (데이터 자리)",
      "▷ 금리/달러: (데이터 자리)",
      "",
      "<b>전략가 코멘트</b>",
      "▷ 조건 충족 전까진 추격보다 구조 확인 우선.",
    ].join("\n");
  }

  if (job === "news") {
    return [
      `🗞️ <b>주요뉴스 브리핑</b> (${d})`,
      "",
      "▷ 1) (핵심 이슈 1줄)",
      "▷ 2) (핵심 이슈 1줄)",
      "▷ 3) (리스크/변수 1줄)",
      "",
      "<b>시장 해석</b>",
      "▷ 뉴스는 재료, 타점은 차트 패턴에서.",
    ].join("\n");
  }

  return [
    `ℹ️ <b>알림</b> (${d})`,
    `job=${job}`,
  ].join("\n");
}
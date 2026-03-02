// src/categories.js
export function buildCategoryButtons() {
  const {
    CAT_REALTIME = "@flow_realtime",
    CAT_THEME = "@flow_theme",
    CAT_WATCH = "@flow_watch",
    CAT_SUPPLY = "@flow_supply",
    CAT_CALENDAR = "@flow_calendar",
    CAT_SHARE = "@flow_share",
  } = process.env;

  const toUrl = (u) => {
    const name = u.startsWith("@") ? u.slice(1) : u;
    return `https://t.me/${name}`;
  };

  return {
    inline_keyboard: [
      [
        { text: "① 실시간 시황", url: toUrl(CAT_REALTIME) },
        { text: "② 테마·섹터", url: toUrl(CAT_THEME) },
        { text: "③ 관심종목", url: toUrl(CAT_WATCH) },
      ],
      [
        { text: "④ 수급분석", url: toUrl(CAT_SUPPLY) },
        { text: "⑤ 일정체크", url: toUrl(CAT_CALENDAR) },
        { text: "⑥ 정보공유방", url: toUrl(CAT_SHARE) },
      ],
    ],
  };
}
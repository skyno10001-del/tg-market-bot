import { sendTelegramMessage } from "./telegram.js";
import { buildMessage } from "./format.js";
import { buildCategoryButtons } from "./categories.js";
import { fetchLastDaily } from "./stooq.js";
import { fetchNewsHeadlines } from "./news.js";

const {
  TG_BOT_TOKEN,
  TG_ADMIN_CHAT_ID,
  TG_CHANNEL_CHAT_ID,
  MODE = "draft",
  JOB = "overseas",
} = process.env;

function getTargetChatId() {
  return MODE === "publish" ? TG_CHANNEL_CHAT_ID : TG_ADMIN_CHAT_ID;
}

async function main() {
  console.log("BOT STARTED");
  console.log("MODE/JOB:", MODE, JOB);

  const chatId = getTargetChatId();
  console.log("Sending to:", chatId);

  let market = null;

  // ✅ 1️⃣ 해외시장 자동 데이터
  if (JOB === "overseas") {
  const [spx, ndx, dji, y10, usd_i, usdkrw] = await Promise.all([
  fetchLastDaily("^SPX"),
  fetchLastDaily("^NDX"),
  fetchLastDaily("^DJI"),
  fetchLastDaily("10YUSY.B"),
  fetchLastDaily("USD_I"),
  fetchLastDaily("USDKRW"),
]);

market = { spx, ndx, dji, y10, usd_i, usdkrw };
  }

  // ✅ 2️⃣ 뉴스 자동 RSS
  if (JOB === "news") {
    const headlines = await fetchNewsHeadlines();
    market = { headlines };
  }

  // ✅ 여기서 market 포함해서 메시지 생성
  const text = buildMessage({ job: JOB, market });

  const replyMarkup = buildCategoryButtons();

  await sendTelegramMessage({
    token: TG_BOT_TOKEN,
    chatId,
    text,
    replyMarkup,
  });

  console.log("Message sent ✅");
}


main().catch((err) => {
  console.error("ERROR:", err?.response?.data || err.message || err);
  process.exit(1);
});
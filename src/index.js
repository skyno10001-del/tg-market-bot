import { sendTelegramMessage } from "./telegram.js";
import { buildMessage } from "./format.js";
import { buildCategoryButtons } from "./categories.js";
import { fetchLastDaily } from "./stooq.js";

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

  const text = buildMessage({ job: JOB });

  // ✅ 하단 카테고리 버튼
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
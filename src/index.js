import { sendTelegramMessage } from "./telegram.js";
import { buildMessage } from "./format.js";

const {
  TG_BOT_TOKEN,
  TG_ADMIN_CHAT_ID,
  TG_CHANNEL_CHAT_ID,
  MODE = "draft",
  JOB = "overseas"
} = process.env;

console.log("TARGET ADMIN:", TG_ADMIN_CHAT_ID);
console.log("MODE/JOB:", MODE, JOB);
console.log("BOT STARTED");

function getTargetChatId() {
  if (MODE === "publish") {
    return TG_CHANNEL_CHAT_ID;
  }
  return TG_ADMIN_CHAT_ID;
}

async function main() {
  const text = buildMessage({ job: JOB });

  const chatId = getTargetChatId();
  console.log("Sending to:", chatId);

  await sendTelegramMessage({
    token: TG_BOT_TOKEN,
    chatId,
    text
  });

  console.log("Message sent");
}

main().catch((err) => {
  console.error("ERROR:", err.message);
});
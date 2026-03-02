import axios from "axios";

export async function sendTelegramMessage({
  token,
  chatId,
  text,
  replyMarkup,
  parseMode = "HTML",
}) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const payload = {
    chat_id: chatId,
    text,
    parse_mode: parseMode,
    disable_web_page_preview: true,
  };

  // ✅ 인라인 버튼
  if (replyMarkup) {
    payload.reply_markup = replyMarkup;
  }

  console.log("TG PAYLOAD:", JSON.stringify(payload));

  const res = await axios.post(url, payload, { timeout: 15000 });
  console.log("TG RESPONSE:", JSON.stringify(res.data));

  if (!res.data?.ok) throw new Error(JSON.stringify(res.data));
  return res.data.result;
}
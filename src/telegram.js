import axios from "axios";

export async function sendTelegramMessage({ token, chatId, text, parseMode = "HTML" }) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: parseMode,
    disable_web_page_preview: true
  };

  const res = await axios.post(url, payload, { timeout: 15000 });
  console.log("TG RESPONSE:", JSON.stringify(res.data));

  if (!res.data?.ok) {
    throw new Error(`Telegram API ok=false: ${JSON.stringify(res.data)}`);
  }
  return res.data.result;
}
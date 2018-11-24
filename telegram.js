const fetch = require("node-fetch");
const qs = require("querystring");
const FormData = require("form-data");
const fs = require("fs");

const sendPhoto = async (
  photoURL,
  caption = "",
  botToken = process.env.TG_BOT_TOKEN,
  chatId = process.env.TG_CHAT_ID,
) => {
  const query = qs.stringify({
    chat_id: chatId,
    caption: caption,
    photo: photoURL,
  });
  const url = `http://api.telegram.org/bot${botToken}/sendPhoto?${query}`;

  const res = await fetch(url);
  console.log(res);
  console.log(await res.text());
};

module.exports = { sendPhoto };

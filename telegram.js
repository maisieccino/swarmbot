const fetch = require("node-fetch");
const qs = require("querystring");
const FormData = require("form-data");

const sendPhoto = async (botToken, chatId, photo, caption) => {
  const form = new FormData();
  form.append("photo", photo);
  const query = qs.stringify({
    chat_id: chatId,
    caption: caption,
  });
  const url = `http://api.telegram.org/bot${botToken}/sendPhoto?${query}`;

  const res = await fetch(url, {
    body: form,
    headers: form.getHeaders(),
  });
  console.log(res.status);
};

module.exports = { sendPhoto };

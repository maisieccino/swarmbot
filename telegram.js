const fetch = require("node-fetch");
const request = require("request");
const qs = require("querystring");
const FormData = require("form-data");
const fs = require("fs");
const TGBot = require("node-telegram-bot-api");

const sendPhoto = async (
  photo,
  caption = "",
  botToken = process.env.TG_BOT_TOKEN,
  chatId = process.env.TG_CHAT_ID,
) => {
  const bot = new TGBot(botToken, { polling: true });
  return bot.sendPhoto(chatId, photo, { caption });
  // const query = qs.stringify({
  //   chat_id: chatId,
  //   caption: caption,
  // });
  // const form = new FormData();
  // form.append("photo", photo, {
  //   filename: "data.jpg",
  //   contentType: "image/jpeg",
  // });
  // const url = `http://api.telegram.org/bot${botToken}/sendPhoto?${query}`;

  // // console.log(form);
  // // const res = await fetch(url, {
  // //   method: "POST",
  // //   body: form,
  // // });
  // // console.log(res);
  // // console.log(await res.text());
  // const formData = {
  //   photo,
  // };
  // return new Promise((res, rej) =>
  //   request.post(
  //     { url, formData, followAllRedirects: true },
  //     (err, response, body) => {
  //       console.log(response);
  //       console.log(body);
  //       if (err) {
  //         rej(err);
  //       } else {
  //         res(body);
  //       }
  //     },
  //   ),
  // );
};

module.exports = { sendPhoto };

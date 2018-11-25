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
};

module.exports = { sendPhoto };

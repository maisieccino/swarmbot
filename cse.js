const fetch = require("node-fetch");
const qs = require("querystring");

const searchForImage = async (
  query = "harshpal bhirth",
  apiKey = process.env.GOOGLE_API_KEY,
  searchEngineId = process.env.GOOGLE_CSE_ID,
) => {
  query = qs.stringify({
    key: apiKey,
    cx: searchEngineId,
    searchType: "image",
    imgSize: "large",
    imgType: "photo",
    q: query,
  });
  const url = `https://www.googleapis.com/customsearch/v1?${query}`;
  return fetch(url);
};

module.exports = { searchForImage };

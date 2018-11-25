const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });
const request = require("request");

const addOverlay = async (imageUrl, overlayUrl) => {
  const size = await new Promise((res, rej) => {
    gm(request(imageUrl)).size((err, val) => {
      if (err) {
        rej(err);
      } else {
        res(val);
      }
    });
  });

  return new Promise((res, rej) =>
    gm(request(imageUrl))
      .composite(process.env.OVERLAY_IMG)
      .toBuffer("jpg", (err, buf) => {
        if (err) {
          rej(err);
        } else {
          res(buf);
        }
      }),
  );
};

module.exports = { addOverlay };

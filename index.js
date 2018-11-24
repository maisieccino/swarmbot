const Koa = require("koa");
const fetch = require("node-fetch");
const fsqClientId = process.env.FOURSQUARE_CLIENT_ID;
const fsqClientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
const fsqAuthToken = process.env.FOURSQUARE_AUTH_CODE || "";
const tgBotToken = process.env.TG_BOT_TOKEN;
const tgChatId = process.env.TG_CHAT_ID;

const searchForCheckin = async () => {
  const searchSince = Date();
  console.log(`Checking for new checkins since ${searchSince}...`);

  if (fsqAuthToken !== "") {
    const res = await fetch(
      `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${fsqAuthToken}&v=20181124`,
    );
    console.log(res.status);
    if (res.ok) {
      console.log(await res.json());
    } else {
      console.log(JSON.stringify(await res.json(), "\n", 2));
    }
  }
};

setInterval(() => searchForCheckin(), 6000);

const app = new Koa();

const redirectUri = "http://localhost:8080/auth/callback";

app.use(async ctx => {
  console.log(ctx.path);
  switch (true) {
    case /^\/auth\/login/.test(ctx.path): {
      ctx.redirect(
        `https://foursquare.com/oauth2/authenticate?client_id=${fsqClientId}&response_type=code&redirect_uri=${encodeURIComponent(
          redirectUri,
        )}`,
      );
      break;
    }

    case /^\/auth\/callback/.test(ctx.path): {
      const { code } = ctx.request.query;
      const res = await fetch(
        `https://foursquare.com/oauth2/access_token?client_id=${fsqClientId}&client_secret=${fsqClientSecret}&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${code}`,
      );
      const body = await res.json();
      ctx.body = body.access_token;
      fsqAuthToken = body.access_token;
      break;
    }
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

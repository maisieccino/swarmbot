FROM node:8-alpine
RUN apk add --no-cache tini imagemagick
WORKDIR /app
ADD package.json /app/package.json
RUN yarn --pure-lockfile
ADD . /app

ENTRYPOINT [ "/sbin/tini", "yarn", "start" ] 
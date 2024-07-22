FROM node:16.20.0-alpine

WORKDIR /srv

RUN apk update && apk upgrade

COPY . /srv
ARG VUE_APP_ENDPOINT='api'
ENV VUE_APP_ENDPOINT=${VUE_APP_ENDPOINT}

RUN yarn
RUN yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "preview" ]
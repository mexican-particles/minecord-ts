FROM node:lts-alpine

RUN apk update --no-cache

ENV TZ Asia/Tokyo
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    apk del tzdata

WORKDIR /var/lib/minecord

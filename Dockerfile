FROM g3.skb:8500/external-image/node:12

RUN mkdir /app
WORKDIR /app
COPY . /app


RUN npm i --production

ENTRYPOINT ["node"]
CMD ["bin/www"]
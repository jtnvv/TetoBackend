
FROM node:21 AS build

WORKDIR "/app"

COPY . .

RUN npm install --no-cache

FROM build

CMD ["tail", "-f", "/dev/null"]
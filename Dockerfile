FROM node:18-alpine AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ENV DATABASE_URL=${DATABASE_URL}
RUN pnpm db:generate
RUN pnpm run build
RUN pnpm prune --prod

FROM base AS deploy
WORKDIR /app

COPY --from=build /app/dist ./dist/
COPY --from=build /app/generated ./generated/
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]

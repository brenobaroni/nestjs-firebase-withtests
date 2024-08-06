

## Steps

```bash
# DB install local needs docker
$ docker compose up -d

# install
$ npm install pnpm -g

# generate prisma / push database like a migration
$ pnpm db:generate
$ pnpm db:push 


# build
$ pnpm build

# start back
$ pnpm start

```

```bash

## firebase login
$ firebase login

## firebase deploy
$ firebase deploy

```
## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```



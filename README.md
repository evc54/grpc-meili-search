# gRPC Meilisearch interface example

## Install dependencies

```bash
npm install
```

## Install Meilisearch

Refer to [documentation](https://www.meilisearch.com/docs/learn/getting_started/installation) or install in Docker:

```bash
docker run -it --rm \
  -p 7700:7700 \
  -e MEILI_ENV='development' \
  getmeili/meilisearch:latest
```

Take generated API key from a container logs and put it into the `consts.ts`:

```js
export const MEILISEARCH_API_KEY = '<generated key>';
```

## Compile protobuf files

*Optional: should be compiled at post install step*

```bash
npm run proto:gen
```

## Run gRPC server

```bash
npm run server
```

## Run gRPC client

```bash
npm run client
```

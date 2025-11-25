FROM oven/bun:1.3.3-alpine
WORKDIR /nexmedis
COPY package.json bun.lock ./
RUN bun i
COPY . .
RUN bun run build
CMD ["bun", "start"]
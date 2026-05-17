# Start with fully-featured Node.js base image
FROM node:22 AS build

RUN npm install -g pnpm

USER node
WORKDIR /home/node/app


# Copy dependency information and install all dependencies
COPY --chown=node:node package.json pnpm-lock.yaml tsconfig.json ./

RUN pnpm install --frozen-lockfile --production=false

# Copy source code (and all other relevant files)
COPY --chown=node:node src ./src

# Build code
RUN pnpm build

# -------------
# Run-time stage
FROM node:22-alpine

RUN npm install -g pnpm

# Set non-root user
USER node

WORKDIR /home/node/app


# Copy dependency information and install production-only dependencies
COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --chown=node:node logs ./logs
RUN pnpm install --frozen-lockfile --production

# Copy results from previous stage
COPY --chown=node:node --from=build /home/node/app/dist ./dist

CMD ["sh", "-c", "pnpm db:migrate && pnpm start"]




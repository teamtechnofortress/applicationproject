# The base image
FROM node:20.16.0-bookworm-slim AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

# Install deps for canvas
RUN apt-get update -y && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi


# Copy the rest of the application files
COPY components ./components
COPY helper ./helper
COPY hooks ./hooks
COPY lib ./lib
COPY models ./models
COPY pages ./pages
COPY public ./public
COPY styles ./styles
COPY utils ./utils

COPY next.config.mjs .
COPY jsconfig.json .
COPY tailwind.config.js .
COPY postcss.config.mjs .

# All NEXT PUBLIC will be bundled into the FE .js files and need to be available at build time
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
ARG NEXT_PUBLIC_STRIPE_PUBLISH_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISH_KEY=$NEXT_PUBLIC_STRIPE_PUBLISH_KEY
ARG NEXT_PUBLIC_PRICE_3_MONTH
ENV NEXT_PUBLIC_PRICE_3_MONTH=$NEXT_PUBLIC_PRICE_3_MONTH
ARG NEXT_PUBLIC_PRICE_6_MONTH
ENV NEXT_PUBLIC_PRICE_6_MONTH=$NEXT_PUBLIC_PRICE_6_MONTH
ARG NEXT_PUBLIC_PRICE_12_MONTH
ENV NEXT_PUBLIC_PRICE_12_MONTH=$NEXT_PUBLIC_PRICE_12_MONTH
ARG NEXT_PUBLIC_PRICE_ONE_TIME
ENV NEXT_PUBLIC_PRICE_ONE_TIME=$NEXT_PUBLIC_PRICE_ONE_TIME

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]
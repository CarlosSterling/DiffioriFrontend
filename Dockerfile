########################  BUILD STAGE  ########################
FROM node:22.17.0-alpine3.22 AS builder
WORKDIR /app

# Dependencias de Node
COPY package*.json ./
RUN npm install --legacy-peer-deps --ignore-scripts

# Copiamos el código
COPY . .

# ----------  ARGs que llegan desde docker‑compose  ----------
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG INTERNAL_API_URL

# ----------  Vars necesarias en tiempo de build  ------------
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    INTERNAL_API_URL=$INTERNAL_API_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

########################  RUNTIME STAGE  ######################
FROM node:22.17.0-alpine3.22
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

# Artefactos del build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Sólo dependencias de producción
RUN npm install --omit=dev --legacy-peer-deps --ignore-scripts

EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]

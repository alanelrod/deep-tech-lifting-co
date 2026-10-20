FROM node:22-alpine
WORKDIR /app
COPY server/package.json ./
RUN npm install --omit=dev
COPY server/index.js ./
ENV NODE_ENV=production
CMD ["npm", "start"]

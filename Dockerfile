
FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run prisma generate
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
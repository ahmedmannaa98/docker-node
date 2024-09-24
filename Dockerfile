# Base Stage
FROM node:20 AS base
WORKDIR /app
COPY package.json . 
EXPOSE 3000

# Development Stage
FROM base AS development
RUN npm install
COPY . . 
CMD ["npm", "run", "start:dev"]

# Production Stage
FROM base AS production
# Install only production dependencies
RUN npm install --only=production
COPY . .
CMD ["npm", "start"]

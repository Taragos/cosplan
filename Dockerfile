FROM node:18-alpine AS deploy-node

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

EXPOSE 3000

CMD node -r dotenv/config build 



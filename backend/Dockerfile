FROM node:18.13.0

RUN mkdir /backend
WORKDIR /backend

COPY package*.json ./

COPY tsconfig.json ./
COPY tsoa.json ./
COPY ormconfig.js ./
COPY src/ ./src

RUN npm install
RUN npm run generate:routes
# RUN npm run build
CMD ["npm", "run", "dev"]

EXPOSE 9090

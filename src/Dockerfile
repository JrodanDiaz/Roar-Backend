FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

EXPOSE 3000

# Run the compiled JS file
CMD ["node", "dist/index.js"]
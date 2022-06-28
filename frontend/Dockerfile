FROM node:alpine

WORKDIR /app/

# Install dependencies
COPY package*.json /app/
RUN npm install

# Add rest of the frontend code
COPY . /app/

EXPOSE 3000

CMD npm start
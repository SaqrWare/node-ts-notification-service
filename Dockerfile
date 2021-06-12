FROM node:14
WORKDIR /app
COPY . .
RUN ls -a
RUN npm install
RUN npm run build
CMD ["npm","start"]
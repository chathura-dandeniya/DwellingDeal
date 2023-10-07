FROM node:19-bullseye

WORKDIR /app

COPY package.json package-lock.json .env ./
RUN npm install

# Bundle app source
COPY bin ./bin/
COPY config ./config/
COPY lib ./lib/
COPY routes ./routes/
COPY views ./views/
COPY config.js app.js ./

EXPOSE  3001

#CMD npm run start:prod
#CMD ["npm", "run", "start:prod"]    
CMD npm start
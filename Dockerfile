FROM node:6.9.4

RUN npm install pm2 -g

CMD ["pm2-docker", "/opt/html-converter-service/src/app.js"]
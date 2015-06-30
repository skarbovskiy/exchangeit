FROM    node:latest

# Bundle app source
COPY . /app
# Install app dependencies
RUN cd /app; npm install

EXPOSE  7777
CMD ["node", "/app/src/protected/server.js"]
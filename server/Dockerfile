FROM node:16

# Create server directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied 
COPY package*.json ./

# Install app dependencies
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .

# Informs Docker that the container listens on the specified network ports at runtime
EXPOSE 3000

# Run command 
CMD [ "node", "app.js" ]


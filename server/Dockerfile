FROM node:16

# Create server directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied 
COPY package*.json ./

# Update container
RUN apt-get update

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Informs Docker that the container listens on the specified network ports at runtime
EXPOSE 3000

# Run command 
CMD npm start


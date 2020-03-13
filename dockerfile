FROM node:13

# Sets the working & current directory in the docker image
WORKDIR /usr/src/app

# Copy over the package*.json to the new docker image
COPY package*.json ./

# Install app dependencies
RUN npm install

# bring over the rest of the source code
COPY . .

# run the app on an exposed port
EXPOSE 8080
CMD [ "npm", "start" ]
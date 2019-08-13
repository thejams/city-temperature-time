# pull a node image from docker hub
FROM node:10-alpine

# set the working dir to /app
WORKDIR /frontend 

# copy package.json to the container
COPY package.json package.json

# install package.json modules in container
# install nodemon for changes on the fly
RUN npm install

# copy everything to container /app
COPY . . 

# expose port 3000 to mount it to another port in local machine 
EXPOSE 3000 

# start server inside container
CMD [ "npm", "start" ] 
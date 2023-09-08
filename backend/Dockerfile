# use official node.js image as base image
FROM node:18
# Create a directory to hold the application code inside the image
WORKDIR /usr/src/app
# Copy the whole of the code
COPY . .
# Running installs and package builds
RUN npm install
RUN npm run build
# Expose the port
EXPOSE 3001
# Run the application in development mode
CMD ["npm", "run", "start:prod"]
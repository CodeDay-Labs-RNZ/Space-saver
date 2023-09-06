# use official node.js image as base image
FROM node:18
# Create a directory to hold the application code inside the image
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the code
COPY . .
# Copy tsconfig.json
COPY tsconfig*.json ./
# Expose the port
EXPOSE 3001
# Run the application in development mode
CMD ["npm", "run", "start:dev"]
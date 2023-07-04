# Use an official Node.js LTS (Long-Term Support) image as the base image
FROM node:18.14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Vue app for production
RUN npm run build

CMD ["npm", "run", "dev"]

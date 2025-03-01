# Dockerfile for backend
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the backend port
EXPOSE 5000

# Run the backend server
CMD ["node", "server.js"]

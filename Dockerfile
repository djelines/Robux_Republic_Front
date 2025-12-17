# Use the official Node.js 22 image as the base image
FROM node:22-alpine
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./
# Install all dependencies
RUN npm ci
# Copy only the necessary files for the application
COPY src ./src
COPY public ./public
COPY index.html ./
COPY vite.config.js ./
COPY jsconfig.json ./
COPY components.json ./
COPY eslint.config.js ./
# Expose port 3000 for the application
EXPOSE 3000
# Start the application
CMD ["npm", "start"]


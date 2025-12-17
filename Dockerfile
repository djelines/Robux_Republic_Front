# Use the official Node.js 22 image as the base image
FROM node:22-alpine
# Switch to the non-root user 'node
USER node
# Copy package.json and package-lock.json to the working directory
COPY --chown=node:node package.json package-lock.json ./
# Set the working directory inside the container
WORKDIR /app
# Change ownership of the working directory to the non-root user 'node'
RUN chown node:node /app
# Install project dependencies
RUN npm ci
# Copy only the necessary files for the application 
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY --chown=node:node index.html ./
COPY --chown=node:node vite.config.js ./
COPY --chown=node:node jsconfig.json ./
COPY --chown=node:node components.json ./
COPY --chown=node:node eslint.config.js ./
# Expose port 3000 for the application
EXPOSE 3000
# Start the application
CMD ["npm", "start"]


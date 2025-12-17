# Use the official Node.js 22 image as the base image
FROM node:22-alpine
# Switch to a non-root user for better security
USER node
# Set the working directory inside the container
WORKDIR /app
# Ensure the working directory has the correct permissions
RUN chown node:node /app
# Copy package.json and package-lock.json to the working directory
COPY --chown=node:node package.json package-lock.json ./ # nosonar
# Install project dependencies
RUN npm ci
# Copy only the necessary files for the application
COPY --chown=node:node src ./src # nosonar
COPY --chown=node:node public ./public # nosonar
COPY --chown=node:node index.html ./ # nosonar
COPY --chown=node:node vite.config.js ./ # nosonar
COPY --chown=node:node jsconfig.json ./ # nosonar
COPY --chown=node:node components.json ./ # nosonar
COPY --chown=node:node eslint.config.js ./ # nosonar
# Expose port 3000 for the application
EXPOSE 3000
# Start the application
CMD ["npm", "start"]


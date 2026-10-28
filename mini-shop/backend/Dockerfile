
# Use a lightweight Node.js image.
FROM node:22-alpine

# Set the application directory inside the container.
WORKDIR /app

# Copy dependency definitions first.
COPY package*.json ./

# Install production dependencies.
RUN npm install --omit=dev

# Copy the backend source code.
COPY server.js ./

# Document the backend's listening port.
EXPOSE 5000

# Start the application.
CMD ["npm", "start"]

FROM node:18

# Set the working directory inside the container
WORKDIR /service-upload

RUN node -v

# Copy all files from the source directory to the working directory
COPY . .

# Install dependencies
RUN npm ci

# Build the TypeScript app
RUN npm run build

# Expose the port that the app listens on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]

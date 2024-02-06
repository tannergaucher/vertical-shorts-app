FROM node:16

# Set the working directory inside the container
WORKDIR /service-upload

# Copy all files from the source directory to the working directory
COPY . .

# Copy the tsconfig.json file to the working directory
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Build the TypeScript app
RUN npm run build

# Expose the port that the app listens on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
FROM node:16

# Set the working directory inside the container
WORKDIR /service-stripe

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy the TypeScript source code to the working directory
COPY . .

# Build the TypeScript app
RUN npm run build

# Expose the port that the app listens on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
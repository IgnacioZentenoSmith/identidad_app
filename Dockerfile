# Use the official Node.js image as the base image
FROM node:18.16.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Expose the port your Nest.js app is running on (usually 4000)
EXPOSE 4500

# Define the command to start your Nest.js app
CMD ["npm", "run", "start:prod"]
# CMD ["npm", "start"]
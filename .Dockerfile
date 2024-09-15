# Step 1: Use an official Node.js image as a base
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the TypeScript files
RUN npm run build

# Step 7: Expose the port that the bot will run on (if applicable, adjust if needed)
EXPOSE 3000

# Step 8: Define the environment variable for the bot (ensure .env is copied)
ENV NODE_ENV=production

# Step 9: Start the bot using the production script
CMD ["npm", "run", "dev"]

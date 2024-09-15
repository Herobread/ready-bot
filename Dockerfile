# Step 1: Use a Node.js base image
FROM node:14

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port (adjust if needed)
EXPOSE 3000

# Step 7: Run the application in development mode
CMD ["npm", "run", "dev"]

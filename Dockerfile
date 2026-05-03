FROM node:18-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment to development
ENV NODE_ENV=development

# Expose port 3000 (React's default port)
EXPOSE 3000

# Start the development server with hot reload
CMD ["npm", "start"]
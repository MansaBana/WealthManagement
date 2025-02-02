# Step 1: Set up Node.js environment for backend
FROM node:20 AS backend-build

# Set the working directory for the backend
WORKDIR /app/backend

# Install backend dependencies
COPY mi-wealth-management-be/ ./
RUN npm install

# Step 2: Set up Next.js for frontend
FROM node:20 AS frontend-build

# Set the working directory for the frontend
WORKDIR /app/frontend

# Install frontend dependencies
COPY fe-wealth-management/ ./
RUN npm install

# Build the Next.js frontend
RUN npm run build

# Step 3: Final image with both frontend and backend
FROM node:20

# Set working directories for both frontend and backend
WORKDIR /app

# Copy backend files from backend-build stage
COPY --from=backend-build /app/backend /app/backend

# Copy frontend files from frontend-build stage
COPY --from=frontend-build /app/frontend /app/frontend

# Expose the ports that both backend and frontend will use
EXPOSE 3001 3000

# Start both frontend and backend processes
CMD ["/bin/sh", "-c", "cd /app/backend && npm start & cd /app/frontend && npm start"]

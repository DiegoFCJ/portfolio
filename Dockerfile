# 1. Fase di build del frontend
FROM node:18 AS build-frontend

WORKDIR /app/frontend

# Copia dei file del frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Build del frontend
COPY ./frontend ./
RUN npm run build -- --output-path=dist --base-href="/DiegoFCJPortfolio/"

# 2. Fase di setup del backend
FROM node:18 AS backend

WORKDIR /app/backend

# Copia dei file del backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

# Copia del backend nel container
COPY ./backend ./

# 3. Fase finale di combinazione e avvio
FROM nginx:alpine

# Copia i file statici del frontend nella directory di Nginx
COPY --from=build-frontend /app/frontend/dist /usr/share/nginx/html

# Copia il backend
COPY --from=backend /app/backend /app/backend

# Espone le porte per backend (3000) e frontend (80)
EXPOSE 3000
EXPOSE 80

# Comando per avviare il backend con PM2 o simile
CMD ["sh", "-c", "cd /app/backend && npm start"]

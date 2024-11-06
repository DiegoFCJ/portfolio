# 1. Immagine di base per il frontend (ad esempio per un'app React)
FROM node:18 as build-frontend

# Impostiamo la directory di lavoro per il frontend
WORKDIR /app/frontend

# Copia il codice del frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Compilazione del progetto frontend
COPY ./frontend ./
RUN npm run build -- --output-path=dist --base-href="/DiegoFCJPortfolio/"

# 2. Immagine di base per il backend (Node.js)
FROM node:18 as backend

# Impostiamo la directory di lavoro per il backend
WORKDIR /app/backend

# Copia il codice del backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

# Copia il codice del backend
COPY ./backend ./

# Espone la porta per il backend
EXPOSE 3000

# 3. Immagine finale che combina il frontend e il backend
FROM nginx:alpine

# Impostiamo la directory di lavoro per il frontend
COPY --from=build-frontend /app/frontend/dist /usr/share/nginx/html

# Copia il backend all'interno del contenitore
COPY --from=backend /app/backend /app/backend

# Espone la porta del backend
EXPOSE 3000

# Avvia il backend con pm2 o simile
CMD ["sh", "-c", "cd /app/backend && npm start"]

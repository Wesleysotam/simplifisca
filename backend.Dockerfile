FROM node:20-alpine
WORKDIR /app

# Copia configurações base do workspace
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Instala dependências do monorepo
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Gera o client do Prisma (necessário para o backend)
RUN npx prisma generate

WORKDIR /app/backend
EXPOSE 3333

# Comando sobrescrito no docker-compose para rodar o push do Prisma
CMD ["node", "src/server.js"]

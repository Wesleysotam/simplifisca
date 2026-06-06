FROM node:20-slim
WORKDIR /app

# Instala o openssl nativo que o motor do Prisma precisa para funcionar
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copia configurações base do workspace
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Instala dependências do monorepo recriando os bindings nativos para o Alpine Linux (musl)
RUN rm -f package-lock.json backend/package-lock.json frontend/package-lock.json && npm install

# Copia todo o código da aplicação
COPY . .

# Gera o client do Prisma (necessário para o backend)
RUN npx prisma generate

WORKDIR /app/backend
EXPOSE 3333

# Comando sobrescrito no docker-compose para rodar o push do Prisma
CMD ["node", "src/server.js"]

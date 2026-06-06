FROM node:20-alpine AS builder
WORKDIR /app

# Copia configurações base do workspace
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Instala dependências do monorepo
RUN npm install

# Copia todo o código da aplicação
COPY . .

WORKDIR /app/frontend
# Faz o build do Vite
RUN npm run build

# Imagem final com Nginx para servir arquivos estáticos
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

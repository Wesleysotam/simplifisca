const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/health', async (req, res) => {
  try {
    // Testa conexão com banco
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database connection failed', error);
    res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
  }
});

// Importar e usar rotas de autenticação
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

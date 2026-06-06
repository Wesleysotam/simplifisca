require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'elineuton@teste.com' },
    update: {},
    create: {
      name: 'Elineuton',
      email: 'elineuton@teste.com',
      password: '123' // Em um ambiente de produção real, usaríamos bcrypt para hashear a senha
    },
  });
  console.log('Seed executado. Usuário criado:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

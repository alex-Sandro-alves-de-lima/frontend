import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;
//npx prisma db push ///para criar o esquema no banco e tem que ta o serviço ligado
//npx prisma generate / desliga a aplicação e roda o comando

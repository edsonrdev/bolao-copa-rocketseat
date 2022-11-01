import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  // cria o servidor
  const fastify = Fastify({
    logger: true, // cria um log da aplicação
  });

  // habilita o CORS, para tornar nosso backend visível para frontends
  await fastify.register(cors, {
    origin: true,
  });

  // cria a rota de contagem dos bolões
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  // roda a aplicação na porta especificada e acessível por qualquer IP na rede
  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();

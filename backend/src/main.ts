import fastify from './infrastructure/webserver/fastify';
import userRoutes from './routes/userRoutes';
import { config } from './config/env';

const start = async () => {
  try {
    // ルートを登録
    fastify.register(userRoutes);

    // サーバー起動
    await fastify.listen({ port: Number(config.port), host: '0.0.0.0' });
    console.log(`🚀 Server is running on port ${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

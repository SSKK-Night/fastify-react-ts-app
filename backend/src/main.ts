import { fastify } from './infrastructure/webserver/fastify';
import { userRoutes } from './routes/userRoutes';
import { taskGenreRoutes } from './routes/taskGenreRoutes';
import { config } from './config/env';
import cron from "node-cron";
import { updateUserCounts } from "./interface/services/userLoadBalancerService";
import { getLeastLoadedNode } from "./util/leastLoadedNode";


const start = async () => {
  try {
    // ルートを登録
    fastify.register(userRoutes, taskGenreRoutes);

    // サーバー起動
    await fastify.listen({ port: Number(config.port), host: '0.0.0.0' });
    console.log(`Server is running on port ${config.port}`);

    // アプリ起動時にユーザー数を更新 & 最も少ないノードを表示
    console.log("アプリ起動時にユーザー数を更新");
    await updateUserCounts();
    await getLeastLoadedNode();
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// 夜9時にユーザー数を更新
cron.schedule("0 21 * * *", async () => {
    console.log("夜9時のユーザー数更新処理を実行");
    await updateUserCounts();
    await getLeastLoadedNode();
});

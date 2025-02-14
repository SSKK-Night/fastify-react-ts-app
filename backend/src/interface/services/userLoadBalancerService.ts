import { redis } from "../../infrastructure/database/redisClient";
import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository();

//  ユーザー数をRedisに更新
export async function updateUserCounts() {
    const nodeUserCounts = await userRepository.getUserCountsPerNode();

    console.log("各ノードのユーザー数:");
    for (const [node, count] of Object.entries(nodeUserCounts)) {
        console.log(`ノード ${node}: ${count} ユーザー`);

        if (typeof count === "number") {
            await redis.set(`user_count:${node}`, count.toString());
            console.log(`Redis に保存完了: user_count:${node} = ${count}`);
        } else {
            console.error(`Redis に保存できない値: node ${node} - count ${count}`);
        }
    }
}






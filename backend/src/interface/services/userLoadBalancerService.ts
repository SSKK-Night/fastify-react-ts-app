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
            console.log(`✅ Redis に保存完了: user_count:${node} = ${count}`);
        } else {
            console.error(`❌ Redis に保存できない値: node ${node} - count ${count}`);
        }
    }
}

// ノード数が最も少ないノードを取得
export async function getLeastLoadedNode(): Promise<string> {
    const nodes = ["1", "2", "3"]; // 修正: "node1" -> "1" にする
    let minCount = Infinity;
    let selectedNode = "1"; // すべて0の場合はデフォルトで node1 を選択

    for (const node of nodes) {
        const count = await redis.get(`user_count:${node}`);
        const userCount = count ? parseInt(count) : Infinity;

        const nodeNumber = Number(node); // ノードの番号を数値に変換
        const selectedNodeNumber = Number(selectedNode);

        // ユーザー数が少ない or 同じならノード番号が小さい方を優先
        if (userCount < minCount || (userCount === minCount && nodeNumber < selectedNodeNumber)) {
            minCount = userCount;
            selectedNode = node;
        }
    }

    console.log(`✅ 選択されたノード: node${selectedNode}（ユーザー数: ${minCount}）`);
    return `node${selectedNode}`; // "node1" のような形式に戻す
}


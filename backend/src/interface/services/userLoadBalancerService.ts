import { redis } from "../../infrastructure/database/redisClient";
import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository();

//  ユーザー数をRedisに更新
export async function updateUserCounts() {
    const nodeUserCounts = await userRepository.getUserCountsPerNode();

    console.log("各ノードのユーザー数:");
    for (const [node, count] of Object.entries(nodeUserCounts)) {
        console.log(`ノード ${node}: ${count} ユーザー`);
        await redis.set(`user_count:${node}`, count);
    }
}

// ユーザー数が最も少ないノードを取得
export async function getLeastLoadedNode(): Promise<string> {
    const nodes = ["node1", "node2", "node3"];
    let minCount = Infinity;
    let selectedNode = "node1"; // すべて0の場合はデフォルトで node1 を選択

    for (const node of nodes) {
        const count = await redis.get(`user_count:${node}`);
        const userCount = count ? parseInt(count) : Infinity;

        const nodeNumber = Number(node.replace("node", "")); // ノードの番号を取得
        const selectedNodeNumber = Number(selectedNode.replace("node", "")); // 現在の選択ノードの番号を取得

        // ユーザー数が少ない or 同じならノード番号が小さい方を優先
        if (userCount < minCount || (userCount === minCount && nodeNumber < selectedNodeNumber)) {
            minCount = userCount;
            selectedNode = node;
        }
    }

    console.log(`選択されたノード: ${selectedNode}（ユーザー数: ${minCount}）`);
    return selectedNode;
}

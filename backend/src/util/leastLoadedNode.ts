import { redis } from "../infrastructure/database/redisClient";
import { getAllNodeIds } from "../infrastructure/database/prismaClient";


export async function getLeastLoadedNode(): Promise<string> {
    const nodes = getAllNodeIds().map(String);;
    let minCount = Infinity;
    let selectedNode = "1";

    for (const node of nodes) {
        const count = await redis.get(`user_count:${node}`);
        const userCount = count ? parseInt(count) : 0;  // null の場合は 0 とする
        const nodeNumber = Number(node);
        const selectedNodeNumber = Number(selectedNode);

        if (userCount < minCount || (userCount === minCount && nodeNumber < selectedNodeNumber)) {
            minCount = userCount;
            selectedNode = node;
        }
    }

    console.log(`選択されたノード: node${selectedNode}（ユーザー数: ${minCount}）`);
    return `node${selectedNode}`;
}

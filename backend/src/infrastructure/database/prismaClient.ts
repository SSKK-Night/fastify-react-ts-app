import { PrismaClient } from '@prisma/client';

// 環境変数からデータベースURLを取得し、ノードを動的に生成
const nodeIds = process.env.NODE_IDS ? process.env.NODE_IDS.split(',').map(Number) : [1, 2, 3];

const dbConnections: Record<number, PrismaClient> = {};
nodeIds.forEach(nodeId => {
  const envVar = `DATABASE_URL_NODE${nodeId}`;
  const url = process.env[envVar];

  if (url) {
    dbConnections[nodeId] = new PrismaClient({ datasources: { db: { url } } });
  } else {
    console.warn(`⚠️ Warning: ${envVar} is not set`);
  }
});



// **全ノードのIDを取得**
export const getAllNodeIds = (): number[] => Object.keys(dbConnections).map(Number);

// **ノードID に応じて適切なデータベースに接続**
export const getDatabaseByNodeId = (nodeid: number): PrismaClient => {
  const db = dbConnections[nodeid];
  if (!db) throw new Error(`Invalid nodeid: ${nodeid}`);
  return db;
};

// **デフォルトノード**
export const prisma: PrismaClient = dbConnections[1];

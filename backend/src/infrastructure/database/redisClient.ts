import Redis from "ioredis";

// Redis の接続設定を確認
export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379, // Redis のポート（デフォルト 6379）
  retryStrategy: times => Math.min(times * 50, 2000), // リトライ戦略
});

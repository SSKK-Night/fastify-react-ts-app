import Redis from "ioredis";

// 最大リトライ回数
const MAX_RETRIES = 10;

// Redis の接続設定
export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379, // Redis のポート（デフォルト 6379）
  connectTimeout: 5000, // 5秒以内に接続できなければタイムアウト
  retryStrategy: (times) => {
    if (times > MAX_RETRIES) {
      console.error("Redis: 最大リトライ回数を超えました。再試行を停止します。");
      return null; // `null` を返すとリトライを停止
    }
    const delay = Math.min(times * 100, 3000); // 100ms から最大 3秒の遅延
    console.warn(`Redis: 接続リトライ (${times} 回目), ${delay}ms 後に再試行`);
    return delay;
  },
});

// 接続時のログ
redis.on("connect", () => {
  console.log("Redis に接続しました");
});

// エラーハンドリング
redis.on("error", (err) => {
  console.error("Redis 接続エラー:", err.message);
});

// 切断時のログ
redis.on("end", () => {
  console.warn("Redis: 接続が切断されました");
});

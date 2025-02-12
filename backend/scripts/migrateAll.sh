#!/bin/bash

# 🚀 すべてのノードのデータベース名を定義
NODES=(
  "fastify_node1"
  "fastify_node2"
  "fastify_node3"
)

# 🚀 `fastify_node1` でマイグレーションを作成（最初の1回のみ）
echo "🚀 Creating migration on fastify_node1..."
DATABASE_URL="postgresql://fastify_user:fastify@localhost:5432/fastify_node1" \
npx prisma migrate dev --name init --schema=prisma/schema.prisma

# 🚀 各ノードにマイグレーションを適用（`migrate deploy` を使用）
for NODE in "${NODES[@]}"; do
  export DATABASE_URL="postgresql://fastify_user:fastify@localhost:5432/$NODE"
  echo "🚀 Applying migration to $DATABASE_URL..."
  
  # ✅ `migrate deploy` を実行
  npx prisma migrate deploy --schema=prisma/schema.prisma

  # ✅ 適用後のテーブル一覧を確認
  echo "🔍 Checking tables in $NODE..."
  PGPASSWORD="fastify" psql -U fastify_user -d "$NODE" -h localhost -c "\dt"
done

echo "✅ 全ノードのマイグレーションが完了しました！"

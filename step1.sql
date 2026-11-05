-- データベースを作成して選択する
CREATE DATABASE IF NOT EXISTS myapp_db CHARACTER SET utf8mb4;
USE myapp_db;

-- usersテーブルを作成する
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- テスト用データを入れる（同じメールアドレスがある場合は追加しない）
INSERT INTO users (name, email)
SELECT '山田太郎', 'yamada@example.com'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'yamada@example.com'
);

INSERT INTO users (name, email)
SELECT '鈴木花子', 'suzuki@example.com'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'suzuki@example.com'
);

-- 2件入っているか確認する
SELECT * FROM users;

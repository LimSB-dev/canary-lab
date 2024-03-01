const { db } = require("@vercel/postgres");
const { posts, users } = require("../app/lib/placeholder-data.ts");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "posts" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    status VARCHAR(50),
    created_at DATE,
    updated_at DATE,
    deleted_at DATE,
    likes INT,
    views INT
    blocks TEXT,
    tags VARCHAR(255),
  );
`;

    console.log(`Created "posts" table`);

    // Insert data into the "posts" table
    const insertedPosts = await Promise.all(
      posts.map((post) => {
        const {
          id,
          title,
          status,
          created_at,
          updated_at,
          deleted_at,
          likes,
          views,
          blocks,
          tags,
        } = post;

        client.sql`
        INSERT INTO posts (id, title, status, created_at, updated_at, deleted_at, likes, views, blocks, tags)
        VALUES (${id}, ${title}, ${status}, ${created_at}, ${updated_at}, ${deleted_at}, ${likes}, ${views}, ${blocks}, ${tags})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
      createTable,
      posts: insertedPosts,
    };
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  console.log("Connected to the database");
  await seedUsers(client);
  await seedPosts(client);

  await client.end();
}

main()
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.error(
      "An error occurred while attempting to seed the database:",
      err
    );
  });

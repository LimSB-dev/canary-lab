const { db } = require("@vercel/postgres");
const { posts, users } = require("../src/app/api/mocks/placeholder-data");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    await client.sql`
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
        return client.query(
          `
          INSERT INTO users (id, name, email, password)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING;
        `,
          [user.id, user.name, user.email, hashedPassword]
        );
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create the "posts" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        created_at DATE NOT NULL,
        updated_at DATE NOT NULL,
        deleted_at DATE,
        status TEXT NOT NULL,
        likes INT DEFAULT 0,
        views INT DEFAULT 0
      )
    `);

    console.log(`Created "posts" table`);

    // Insert data into the "posts" table
    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        const {
          id,
          title,
          content,
          tags,
          createdAt,
          updatedAt,
          deletedAt,
          status,
          likes,
          views,
        } = post;

        return client.query(
          `
          INSERT INTO posts (id, title, content, tags, created_at, updated_at, deleted_at, status, likes, views)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          ON CONFLICT (id) DO NOTHING;
        `,
          [
            id,
            title,
            content,
            tags,
            createdAt,
            updatedAt,
            deletedAt,
            status,
            likes,
            views,
          ]
        );
      })
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
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
  .then(() => {
    console.log("Seed completed successfully");
  })
  .catch((err) => {
    console.error(
      "An error occurred while attempting to seed the database:",
      err
    );
  });

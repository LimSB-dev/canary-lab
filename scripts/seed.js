const { db } = require("@vercel/postgres");
const { posts, users } = require("../src/app/api/mocks/placeholder-data");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image TEXT DEFAULT NULL,
        provider TEXT DEFAULT 'github',
        last_login DATE DEFAULT NULL,
        login_count INT DEFAULT 0
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.query(
          `
          INSERT INTO users (id, name, email)
          VALUES ($1, $2, $3)
          ON CONFLICT (id) DO NOTHING;
        `,
          [user.id, user.name, user.email]
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
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        index SERIAL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        comments UUID[] DEFAULT '{}',
        created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATE DEFAULT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        likes INT DEFAULT 0,
        views INT DEFAULT 0
      )
    `);

    console.log(`Created "posts" table`);

    // Insert data into the "posts" table
    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        const { title, content, tags, createdAt, updatedAt, likes, views } =
          post;

        return client.query(
          `
          INSERT INTO posts (title, content, tags, created_at, updated_at, likes, views)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT DO NOTHING;
        `,
          [title, content, tags, createdAt, updatedAt, likes, views]
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

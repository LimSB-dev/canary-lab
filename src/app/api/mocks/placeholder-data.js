const { type } = require("os");

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "admin@canary-lab.vercel.app",
    password: "@admin1",
  },
];

const posts = [
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442a",
    title: "First Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: null,
    likes: 5,
    views: 10,
    content: "this is the first post",
  },
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442b",
    title: "Second Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: null,
    likes: 10,
    views: 20,
    content: "this is the second post",
  },
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442d",
    title: "Fourth Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: null,
    likes: 20,
    views: 40,
    content: "this is the fourth post",
  },
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442e",
    title: "Fifth Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: null,
    likes: 25,
    views: 50,
    content: "this is the fifth post",
  },
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442f",
    title: "Popular Post",
    status: "published",
    createdAt: "2024-04-27T00:00:00.000Z",
    updatedAt: "2024-04-27T00:00:00.000Z",
    deletedAt: null,
    likes: 1000,
    views: 2000,
    content: "this is the popular post",
  },
];

module.exports = {
  users,
  posts,
};

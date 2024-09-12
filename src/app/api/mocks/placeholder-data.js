const { type } = require("os");

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Admin",
    email: "admin@canary-lab.vercel.app",
  },
];

const posts = [
  {
    title: "First Post",
    content: "this is the first post",
    createdAt: "2020-06-03T00:00:00.000Z",
    updatedAt: "2020-06-03T00:00:00.000Z",
    likes: 5,
    views: 10,
  },
  {
    title: "Second Post",
    content: "this is the second post",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    likes: 10,
    views: 20,
  },
  {
    title: "Fourth Post",
    content: "this is the fourth post",
    updatedAt: "2022-06-03T00:00:00.000Z",
    createdAt: "2022-06-03T00:00:00.000Z",
    likes: 20,
    views: 40,
  },
  {
    title: "Fifth Post",
    content: "this is the fifth post",
    createdAt: "2023-06-03T00:00:00.000Z",
    updatedAt: "2023-06-03T00:00:00.000Z",
    likes: 25,
    views: 50,
  },
  {
    title: "Popular Post",
    content: "this is the popular post",
    updatedAt: "2024-04-27T00:00:00.000Z",
    createdAt: "2024-04-27T00:00:00.000Z",
    likes: 1000,
    views: 2000,
  },
];

module.exports = {
  users,
  posts,
};

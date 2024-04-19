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
    deletedAt: "",
    likes: 5,
    views: 10,
    blocks: [
      {
        type: "header",
        data: {
          text: "First Post",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This is the first post.",
        },
      },
    ],
  },
];

module.exports = {
  users,
  posts,
};

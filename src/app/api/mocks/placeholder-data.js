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
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442b",
    title: "Second Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: "",
    likes: 10,
    views: 20,
    blocks: [
      {
        type: "header",
        data: {
          text: "Second Post",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This is the second post.",
        },
      },
    ],
  },
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442c",
    title: "Third Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: "",
    likes: 15,
    views: 30,
    blocks: [
      {
        type: "header",
        data: {
          text: "Third Post",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This is the third post.",
        },
      },
    ],
  },
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442d",
    title: "Fourth Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: "",
    likes: 20,
    views: 40,
    blocks: [
      {
        type: "header",
        data: {
          text: "Fourth Post",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This is the fourth post.",
        },
      },
    ],
  },
  {
    id: "58dc9e0b-712f-4377-85e9-fec4b6a6442e",
    title: "Fifth Post",
    status: "published",
    createdAt: "2021-06-03T00:00:00.000Z",
    updatedAt: "2021-06-03T00:00:00.000Z",
    deletedAt: "",
    likes: 25,
    views: 50,
    blocks: [
      {
        type: "header",
        data: {
          text: "Fifth Post",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This is the fifth post.",
        },
      },
    ],
  },
];

module.exports = {
  users,
  posts,
};

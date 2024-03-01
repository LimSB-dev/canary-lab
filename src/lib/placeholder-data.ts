import { PostData } from "@/types/post";

const users: UserData[] = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "admin@canary-lab.vercel.app",
    password: "@admin1",
    role: "admin",
  },
];

const posts: PostData[] = [
  {
    id: "1",
    status: "published",
    title: "First Post",
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
    comments: [],
    tags: [],
  },
];

module.exports = {
  users,
  posts,
};

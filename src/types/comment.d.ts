interface IComment {
  id: string;
  postId: string;
  postIndex: number;
  userId: string;
  userEmail: string;
  userName: string;
  userImage: string | null;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}

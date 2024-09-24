interface IPost {
  id: string;
  index: number;
  title: string;
  content: string;
  tags: ITag.id[];
  comments: IComment.id[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  status: "deleted" | "draft" | "published";
  likes: IUser.id[];
  views: number;
}

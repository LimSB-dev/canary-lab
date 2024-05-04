interface IPost {
  id: string;
  index: number;
  title: string;
  content: string;
  tags: ITag.id[];
  comments: IComment.id[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  status: "deleted" | "draft" | "published";
  likes: number;
  views: number;
}

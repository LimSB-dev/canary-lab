interface ITag {
  id: string;
  name: string;
  color: string;
}

interface IPost {
  id: string;
  status: "deleted" | "draft" | "published";
  title: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  content: string;
  comments: IComment.id[];
  tags: ITag.id[];
}

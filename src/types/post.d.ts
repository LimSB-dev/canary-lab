interface IPost {
  id: string;
  index: number;
  title: string;
  content: string;
  /** AI 생성 또는 업로드된 썸네일 이미지 URL */
  thumbnailUrl?: string | null;
  tags: ITag.id[];
  comments: IComment.id[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  status: "deleted" | "draft" | "published";
  likes: IUser.id[];
  views: number;
}

import { OutputBlockData } from "@editorjs/editorjs";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface PostData {
  id: string;
  status: "deleted" | "draft" | "published";
  title: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  blocks: OutputBlockData[];
  comments: Comment[];
  tags: Tag[];
}

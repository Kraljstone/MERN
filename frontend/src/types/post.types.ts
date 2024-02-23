export interface PostType {
  createdAt: string;
  creator: string;
  likeCount: number;
  selectedFile: string;
  message?: string;
  tags: string[];
  title: string;
  _id: string;
  userId: string;
}

export interface CurrentPagePosts {
  currentPage: number;
  data: PostType[];
  numberOfPages: number;
}

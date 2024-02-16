export interface PostType {
  createdAt: string;
  creator: string;
  likeCount: number;
  selectedFile: string;
  message?: string;
  tags: string[];
  title: string;
  __v: number;
  _id: string;
}

export interface CurrentPagePosts {
  currentPage: number;
  data: PostType[];
  numberOfPages: number;
}

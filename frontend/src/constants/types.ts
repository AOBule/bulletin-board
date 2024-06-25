export interface Comment {
  id: number;
  text: string;
  userId: number;
  userName: string;
  postId: number;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  category: string;
  userId: number;
  userName: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface User {
  id: number;
  account: string;
  name: string;
  branchId: number;
  departmentId: number;
  isStopped: boolean;
  branchName: string;
  departmentName: string;
}

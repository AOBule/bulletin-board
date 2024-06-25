import React from 'react';
import { Post } from '../constants/types';
import PostItem from './PostItem';
import '../styles/PostList.scss';

interface PostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onClick={() => onPostClick(post)} />
      ))}
    </div>
  );
};

export default PostList;

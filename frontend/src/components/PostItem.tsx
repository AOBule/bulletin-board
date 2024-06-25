import React from 'react';
import { Post } from '../constants/types';
import '../styles/PostItem.scss';
import { format } from 'date-fns';
import logo from '../commentLogo.png';
import userlogo from '../userLogo.png';

interface PostItemProps {
  post: Post;
  onClick: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onClick }) => {

  const formatDate = (dateArray: any): string => {
    try {
        const date = new Date(Date.UTC(
            dateArray[0], dateArray[1] - 1, dateArray[2],
            dateArray[3], dateArray[4], dateArray[5],
            dateArray[6] / 1000000
        ));
        return format(date, 'yyyy-MM-dd HH:mm');
    } catch (error) {
        console.error('日付形式が無効です:', dateArray);
        return 'Invalid date';
    }
  };

  return (
    <div className="post-item" onClick={onClick}>
      <div className="post-header">
        <img src={userlogo} alt="Logo" />
        <span className="post-author">{post.userName}</span>
        <span className="post-branch">{post.category}</span>
      </div>
      <div className="post-body">
        <div>
          <span className="post-title">{post.title}</span>
        </div>
        <div>
          <span className="post-content">{post.text}</span>
        </div>
      </div>
      <div className="post-footer">
      <span className="post-createdAt">{formatDate(post.createdAt)}</span>
      <div className="post-comment-count">
          <img src={logo} alt="Logo" />
          <span className="post-comment-count">{post.comments ? post.comments.length : 0}</span>
      </div>
      </div>
    </div>
  );
};

export default PostItem;

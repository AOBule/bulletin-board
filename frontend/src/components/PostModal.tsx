import React, { useState } from 'react';
import axios from 'axios';
import { Post, Comment } from '../constants/types';
import '../styles/PostModal.scss';
import { format } from 'date-fns';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, isOpen, onClose }) => {
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/comments`, { text: newComment,userId: post.userId, postId: post.id, });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateArray: any): string => {
    try {
        const date = new Date(Date.UTC(
            dateArray[0], dateArray[1] - 1, dateArray[2],
            dateArray[3], dateArray[4], dateArray[5],
            dateArray[6] / 1000000
        ));
        return format(date, 'yyyy-MM-dd HH:mm');
    } catch (error) {
        console.error('Invalid date format:', dateArray);
        return 'Invalid date';
    }
  };

  return (
    <div className="post-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{post.title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{post.text}</p>
          <p>{formatDate(post.createdAt)}</p>
          <div className="comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment.userName}</p>
                <p>{comment.text}</p>
                <span>{formatDate(comment.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

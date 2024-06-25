import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { usePostValidation } from '../components/usePostValidation';
import axios from 'axios';
import '../styles/NewPost.scss';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface NewPostModalProps {
  onClose: () => void;
}

const NewPost: React.FC<NewPostModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const { errors, postValidation } = usePostValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validateで入力チェックし、問題ない場合trueが返ってくる
    if (postValidation({ title, text, category })) {
      try {
        await axios.post(`${API_BASE_URL}/posts`, { title, text, category, userId:  user.id });
        onClose();
      } catch (error) {
        setError('投稿に失敗しました');
      }
    }
  };

  return (
    <div className="new-post-container">
      <h2>新規投稿</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="account">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="error">
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="text">本文</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <div className="error">
            {errors.text && <span className="error">{errors.text}</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category">カテゴリー</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <div className="error">
            {errors.category && <span className="error">{errors.category}</span>}
          </div>
        </div>
        <button type="submit" className="submit-button">投稿</button>
        <button onClick={onClose} className='cancel-button'>キャンセル</button>
      </form>
    </div>
  );
};

export default NewPost;
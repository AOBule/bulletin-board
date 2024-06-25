import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import PostFilter from '../components/PostFilter';
import PostModal from '../components/PostModal';
import Modal from 'react-modal';
import NewPostModal from './NewPost';
import logo from '../logo.png';
import { Post, User, Comment } from '../constants/types';
import '../styles/Home.scss';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchComments();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, { params: filters });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const usersData: User[] = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error('ユーザー情報の取得に失敗しました');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments`);
      const commentsData: Comment[] = response.data;
      setComments(commentsData);
    } catch (error) {
      console.error('コメントの取得に失敗しました');
    }
  };

  useEffect(() => {
    if (posts.length > 0 && users.length > 0 && comments.length > 0) {
      posts.forEach(post => {
        const user = users.find(u => post.userId === u.id);
        post.userName = user ? user.name : 'Unknown User';
        comments.forEach(comment => {
          const user =  users.find(u => comment.userId === u.id);
          comment.userName = user ? user.name : 'Unknown User';
        })
        const postComments = comments.filter(c => post.id === c.postId);
        post.comments = postComments;
      });
    }
  }, [users, posts, comments]);

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setShowNewPostModal(false);
  };

  return (
    <div className="home-page">
      <PostFilter filters={filters} setFilters={setFilters} />
      <PostList posts={posts} onPostClick={handleOpenModal} />
      {selectedPost && (
        <PostModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      <Modal
        isOpen={showNewPostModal}
        onRequestClose={closeModal}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
      >
        <NewPostModal onClose={closeModal} />
      </Modal>
      <button className="new-post-button" onClick={() => setShowNewPostModal(true)}>
        <img src={logo} alt="Logo" />
      </button>
      {showNewPostModal && <NewPostModal onClose={() => setShowNewPostModal(false)} />}
    </div>
  );
};

export default Home;

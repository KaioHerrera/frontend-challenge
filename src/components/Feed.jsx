import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DeleteForever, EditSquare } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';

import './Feed.css';

const API_URL = 'https://dev.codeleap.co.uk/careers/';

export default function Feed({ userName }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setShowEditModal(true);
  };

  const handleDelete = (postId) => {
    setSelectedPost(postId);
    setShowDeleteModal(true);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data.results || []);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
    setLoading(false);
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    try {
      await axios.post(API_URL, {
        username: userName,
        title,
        content,
      });

      setTimeout(() => {
        setTitle('');
        setContent('');
        fetchPosts();
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleCreatePost();
    }
  };

  return (
    <div className='feed-wrapper'>
      <div className='feed-header'>
        <h1>CodeLeap Network</h1>
      </div>
      <div className='feed-container'>
        <div className='create-post'>
          <h2>What's on your mind?</h2>

          <label className='post-label'>Title</label>
          <input
            type='text'
            placeholder='Hello world'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='post-input'
            onKeyDown={handleKeyDown}
          />

          <label className='post-label'>Content</label>
          <textarea
            placeholder='Content here'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='post-textarea'
            rows={4}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleCreatePost}
            className='post-button'
            disabled={!title.trim() || !content.trim()}
          >
            Create
          </button>
          {isSubmitting && <div className='post-progress-bar'></div>}
        </div>

        <div className='posts-list'>
          {loading ? (
            <div className='loading-spinner'>
              <CircularProgress />
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className='post-card'>
                <div className='post-header'>
                  <h1>{post.title}</h1>
                  {post.username === userName && (
                    <div className='post-actions'>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className='action-btn'
                      >
                        <DeleteForever />
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className='action-btn'
                      >
                        <EditSquare />
                      </button>
                    </div>
                  )}
                </div>
                <div className='post-info'>
                  <div className='post-meta'>
                    <span className='post-user'>@{post.username}</span>
                    <span className='post-time'>
                      {formatDistanceToNow(new Date(post.created_datetime), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  <p className='post-content'>{post.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={editTitle}
        content={editContent}
        setTitle={setEditTitle}
        setContent={setEditContent}
        onSave={async () => {
          await axios.patch(`${API_URL}${selectedPost.id}/`, {
            title: editTitle,
            content: editContent,
          });
          setShowEditModal(false);
          fetchPosts();
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={async () => {
          await axios.delete(`${API_URL}${selectedPost}/`);
          setShowDeleteModal(false);
          fetchPosts();
        }}
      />
    </div>
  );
}

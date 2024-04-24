import React, { useState } from 'react';
import './Comments.css';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    username: '',
    avatar: '',
    email: '',
    text: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [secretWord, setSecretWord] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewComment((prevComment) => ({
          ...prevComment,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      const updatedComments = [...comments];
      updatedComments[editIndex] = newComment;
      setComments(updatedComments);
      setEditIndex(null);
    } else {
      setComments([...comments, newComment]);
    }
    setNewComment({
      username: '',
      avatar: '',
      email: '',
      text: '',
    });
    setAvatarFile(null);
  };

  const handleEdit = (index) => {
    setNewComment(comments[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (secretWord === 'yourSecretWord') {
      const updatedComments = [...comments];
      updatedComments.splice(index, 1);
      setComments(updatedComments);
      setShowConfirmDelete(false);
    } else {
      alert('Incorrect secret word. Deletion canceled.');
    }
  };

  const handleViewInfo = (index) => {
    const comment = comments[index];
    alert(`Username: ${comment.username}\nEmail: ${comment.email}\nDate: ${new Date().toLocaleString()}`);
  };

  return (
    <div className="comments-container">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={newComment.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          required
        />
        {newComment.avatar && (
          <img src={newComment.avatar} alt="Avatar" style={{ maxWidth: '100px', marginBottom: '10px' }} />
        )}
        <input
          type="email"
          name="email"
          value={newComment.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="text"
          value={newComment.text}
          onChange={handleChange}
          placeholder="Comment"
          required
        />
        <button type="submit">{editIndex !== null ? 'Edit Comment' : 'Add Comment'}</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <div>
              <span>{comment.username}</span>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => setShowConfirmDelete(true)}>Delete</button>
              <button onClick={() => handleViewInfo(index)}>Info</button>
            </div>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      {showConfirmDelete && (
        <div className="confirm-delete">
          <p>Enter secret word to confirm deletion:</p>
          <input
            type="password"
            value={secretWord}
            onChange={(e) => setSecretWord(e.target.value)}
            placeholder="Secret Word"
          />
          <button onClick={() => setShowConfirmDelete(false)}>Cancel</button>
          <button onClick={() => handleDelete(editIndex)}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default Comments;

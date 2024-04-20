import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const baseURL = 'http://localhost:5000'; // Assuming backend server is running on port 5000

  const api = axios.create({
    baseURL: baseURL,
    timeout: 5000, // Adjust the timeout as needed
  });
  
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await api.get('/api/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !creator) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await api.post('/api/articles', { title, description, creator });
      fetchArticles();
      setTitle('');
      setDescription('');
      setCreator('');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className="container">
      <h1>Health Articles</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field"></textarea>
        <input type="text" placeholder="Creator" value={creator} onChange={(e) => setCreator(e.target.value)} className="input-field" />
        <button type="submit" className="submit-btn">Add Article</button>
      </form>
      <ul className="article-list">
        {articles?.map((article) => (
          <li key={article._id} className="article-item">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>Creator: {article.creator}</p>
            <p>Date: {new Date(article.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import { useState } from 'react';
import './Home.css';

export default function Home({ onLogin }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!name.trim()) return;

    setLoading(true);

    setTimeout(() => {
      onLogin(name);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='login-container'>
      <h1 className='login-title'>Welcome to CodeLeap network!</h1>
      <p className='login-subtitle'>Please enter your username</p>

      <input
        type='text'
        placeholder='Username'
        className='login-input'
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        onKeyDown={handleKeyDown}
      />

      <button
        className='login-button'
        disabled={!name.trim() || loading}
        onClick={handleSend}
      >
        {loading ? 'Loading...' : 'ENTER'}
      </button>

      {loading && <div className='login-progress-bar' />}
    </div>
  );
}

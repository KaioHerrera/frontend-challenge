import { useState } from 'react';
import Home from './pages/Home';
import Feed from './components/Feed';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [userName, setUserName] = useState('');

  return (
    <div className='app-container'>
      <ThemeToggle />
      {!userName ? (
        <Home onLogin={setUserName} />
      ) : (
        <Feed userName={userName} />
      )}
    </div>
  );
}

export default App;

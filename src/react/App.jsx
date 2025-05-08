// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameEntry from './components/GameEntry'; // Your existing code, moved here
import AuthCallback from './components/AuthCallback';

export default function App () {
  return (
    <Router>
      <Routes>
        <Route path='/auth/callback' element={<AuthCallback />} />
        <Route path='/' element={<GameEntry />} />
      </Routes>
    </Router>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AuthCallback from './AuthCallback';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/callback' element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './App';
// import AuthCallback from './AuthCallback';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<App />} />
//         <Route path='/auth/callback' element={<AuthCallback />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import AuthProvider from './components/AuthProvider.jsx';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);

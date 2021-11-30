import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { links } from './links';

import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={links.home} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

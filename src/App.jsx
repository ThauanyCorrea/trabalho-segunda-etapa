import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cursos from './Pages/Cursos';
import Alunos from './Pages/Alunos';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<></>} />
          <Route exact path="/cursos" element={<Cursos />} />
          <Route exact path="/alunos" element={<Alunos />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

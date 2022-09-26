import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';

export default function Routers() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route exact path="/aluno/:id/edit" element={<Aluno />} />
        <Route exact path="/aluno/" element={<Aluno />} />
        <Route exact path="/fotos/:id" element={<Fotos />} />
      </Route>
      <Route exact path="/register" element={<Register />} />
      <Route path="/" element={<Alunos />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Seu nome deve conter de 3 à 255 caracteres !');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido !');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Sua senha deve conter de 6 à 50 caracteres !');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      await axios.post('/users', { nome, password, email });
      toast.success('Você fez seu cadastro !');
      setIsLoading(false);
      navigate('/login');
    } catch (err) {
      const errors = get(err, 'response.data.errors');

      errors.map((error) => toast.error(error));
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Crie sua conta</h1>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}

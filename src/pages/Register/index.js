import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, []);

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

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Sua senha deve conter de 6 à 50 caracteres !');
    }

    if (formErrors) return;

    dispatch(
      actions.registerRequest({
        nome,
        email,
        emailStored,
        password,
        id,
        navigate,
      }),
    );
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>
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

        <button type="submit">
          {id ? 'Salvar alterações' : 'Criar conta'}
        </button>
      </Form>
    </Container>
  );
}

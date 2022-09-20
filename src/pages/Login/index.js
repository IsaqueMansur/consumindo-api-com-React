import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prevPath = useLocation().state;

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido !');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha invalida !');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Container>
        <Loading isLoading={isLoading} />
        <h1>Login</h1>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
          <button type="submit">Acessar</button>
        </Form>
      </Container>
    );
  }
  try {
    navigate(prevPath);
  } catch {} // eslint-disable-line no-empty
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>TESTE</h1>
    </Container>
  );
}

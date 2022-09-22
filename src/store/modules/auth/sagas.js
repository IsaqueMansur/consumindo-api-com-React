import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  const { navigate, prevPath } = payload;
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    toast.success('Login efetuado com sucesso !');
    navigate(prevPath || '/');
  } catch (e) {
    toast.error('Usuário ou senha inválidos !');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, nome, email, emailStored, password, navigate } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Informações alteradas com sucesso !');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
      if (email !== emailStored) {
        toast.info('Você precisa fazer login com o novo e-mail cadastrado !');
        yield put(actions.loginFailure());
        navigate('/login');
      }
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Usuário cadastrado com sucesso !');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      navigate('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      yield put(actions.loginFailure());
      navigate('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);

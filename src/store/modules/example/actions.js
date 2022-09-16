import * as types from '../types';

export function cliclaBotaoRequest() {
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}

export function cliclaBotaoSuccess() {
  return {
    type: types.BOTAO_CLICADO_SUCCESS,
  };
}

export function cliclaBotaoFailure() {
  return {
    type: types.BOTAO_CLICADO_FAILURE,
  };
}

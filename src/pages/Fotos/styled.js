import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Tittle = styled.h1`
  text-align: center;
`;

export const Uploader = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 20px;
  }
`;

export const Form = styled.form`
  label {
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    display: flex;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 180px;
      height: 180px;
    }
  }

  input {
    display: none;
  }
`;

import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Tittle = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border: 2px solid ${colors.primaryColor};
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: ${colors.primaryColor};
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  a:hover {
    filter: brightness(90%);
  }
`;

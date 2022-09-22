import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 20px 0;
`;

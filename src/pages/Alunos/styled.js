import styled from 'styled-components';

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

import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import { get } from 'lodash';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Tittle, Form, Uploader } from './styled';
import axios from '../../services/axios';

export default function Fotos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        toast.error('Erro ao obter imagem !');
        setIsLoading(false);
        navigate('/');
      }
    };
    getData();
  }, []);

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Tittle>Fotos</Tittle>

      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img src={foto} alt="" crossOrigin="" />
          ) : (
            <Uploader>
              <FaUpload size={60} />
              <p>Upload</p>
            </Uploader>
          )}
          <input type="file" id="foto" />
        </label>
      </Form>
    </Container>
  );
}

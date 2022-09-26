import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { get } from 'lodash';
import { FaUserCircle, FaEdit } from 'react-icons/fa';

import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Tittle } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno() {
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url');

        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', 0);

        if (status === 400) errors.map((error) => toast.error(error));
        navigate('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('O nome do aluno deve conter de 3 à 255 caracteres !');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('O sobrenome do aluno deve conter de 3 à 255 caracteres !');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido !');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade inválida !');
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso inválido !');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura inválida !');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      if (id) {
        setIsLoading(true);
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Informações atualizadas com sucesso !');
      } else {
        setIsLoading(true);
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso !');
        navigate(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
        setIsLoading(false);
      } else {
        toast.error('Erro desconhecido !');
        setIsLoading(false);
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Tittle>{id ? 'Editar aluno' : 'Cadastrar aluno'}</Tittle>
      <ProfilePicture>
        {foto ? (
          <img src={foto} alt={nome} crossOrigin="" />
        ) : (
          <FaUserCircle size={180} />
        )}
        <Link to={`/fotos/${id}`}>
          <FaEdit size={30} />
        </Link>
      </ProfilePicture>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
          step="0.010"
        />
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
          step="0.010"
        />

        <button type="submit">{id ? 'Editar' : 'Cadastrar'}</button>
      </Form>
    </Container>
  );
}

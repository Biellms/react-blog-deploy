import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Services';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#red',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgb(202, 199, 199)',
    },
    '&:hover fieldset': {
      borderColor: 'white',
      boxShadow: '2px 2px 2px white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'red',
      boxShadow: '3px 3px 3px rgb(207, 55, 55)',
    },
  },
});

function CadastroUsuario() {

  let history = useHistory();
  const [confirmarSenha, setConfirmarSenha] = useState<String>("")
  const [user, setUser] = useState<User>(
    {
      id: 0,
      nome: '',
      usuario: '',
      senha: ''
    })

  const [userResult, setUserResult] = useState<User>(
    {
      id: 0,
      nome: '',
      usuario: '',
      senha: ''
    })

  useEffect(() => {
    if (userResult.id != 0) {
      history.push("/login")
    }
  }, [userResult])


  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }


  function updatedModel(e: ChangeEvent<HTMLInputElement>) {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (confirmarSenha == user.senha) {
      cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
      toast.success('Usuário cadastrado com sucesso!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
    } else {
      toast.error('Dados inconsistentes. Favor verificar as informações de cadastro!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
    }
  }

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center' className='grid-cadastro'>
      <Grid item xs={6} className='imagem2'></Grid>
      <Grid item xs={6} alignItems='center'>
        <Box paddingX={10}>
          <form onSubmit={onSubmit}>
            <Typography variant='h3' gutterBottom component='h3' align='center' className='text-bold-cadastro'>Cadastrar</Typography>
            <CssTextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='Nome' variant='outlined' name='nome'
              margin='normal' fullWidth />
            <CssTextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuario' variant='outlined' name='usuario'
              margin='normal' fullWidth />
            <CssTextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal'
              type='password' fullWidth />
            <CssTextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='ConfirmarSenha' variant='outlined' name='confirmarSenha' margin='normal'
              type='password' fullWidth />
            <Box marginTop={2} textAlign='center'>
              <Link to='/login' className='text-decorator-none'>
                <Button variant='contained' color='primary' className='botao-cancelar'>
                  Cancelar
                </Button>
              </Link>
              <Button type='submit' variant='contained' className='botao-cadastrar'>
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CadastroUsuario;

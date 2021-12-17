import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/Services';
import { styled } from '@mui/material/styles';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4c63fc',
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
      borderColor: '#4c63fc',
      boxShadow: '3px 3px 3px 3px #303F9E',
    },
  },
});

function Login() {

  let history = useHistory();
  const dispatch = useDispatch()
  const [token, setToken] = useState('');

  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    usuario: '',
    senha: '',
    token: ''
  })

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (token != '') {
      dispatch(addToken(token))
      history.push('/home')
    }
  }, [token])

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login('/usuarios/logar', userLogin, setToken)
      toast.success('Usuário logado com sucesso!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
    } catch (error) {
      toast.error('Dados inconsistentes. Favor verificar as informações de login!', {
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
    <Grid container direction='row' justifyContent='center' alignItems='center' className='grid-login' >
      <Grid xs={6} alignItems='center'>
        <Box paddingX={20}>
          <form onSubmit={onSubmit}>
            <Typography variant="h3" gutterBottom color="initial" component="h3" align="center" className='text-bold-login'>Entrar</Typography>
            <CssTextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario'
              margin='normal' fullWidth />
            <CssTextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal'
              type='password' fullWidth />
            <Box marginTop={2} textAlign='center'>
              <Button type='submit' variant='contained' color='primary' className='botao-logar'>
                Logar
              </Button>
            </Box>
          </form>
          <Box display='flex' justifyContent='center' marginTop={2}>
            <Box marginRight={1}>
              <Typography variant='subtitle1' gutterBottom align='center' className='text-login'>Não tem uma conta?</Typography>
            </Box>
            <Link to='/cadastroUsuario' className='text-decorator-none'>
              <Typography variant='subtitle1' gutterBottom align='center' className='text-bold-login'>Cadastre-se</Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} className='grid-imagem-login'>
      </Grid>
    </Grid>
  );
}

export default Login;

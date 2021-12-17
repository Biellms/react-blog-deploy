import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify';

function NavBar() {

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let history = useHistory()
  const dispatch = useDispatch();

  function goLogout() {
    dispatch(addToken(''))
    toast.info('Usuário deslogado', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: 'colored',
      progress: undefined,
    });
    history.push('/login')
  }

  let navbarComponet;

  if (token != '') {
    navbarComponet = <AppBar position="static">
      <Toolbar variant="dense" className='appbar'>
        <Link to='/home'>
          <Box className='pointer' >
            <Typography variant="h5" color="inherit">
              <img src="https://i.imgur.com/O1GG69J.png" alt="" width="" height="200px" />
            </Typography>
          </Box>
        </Link>
        <Box display="flex" justifyContent="start">
          <Link to='/home' className='text-decorator-none'>
            <Box mx={1} className='pointer'>
              <Typography variant="h6" color="inherit" className='text-navbar'>
                Home
              </Typography>
            </Box>
          </Link>
          <Link to='/posts' className='text-decorator-none'>
            <Box mx={1} className='pointer'>
              <Typography variant="h6" color="inherit" className='text-navbar'>
                Postagens
              </Typography>
            </Box>
          </Link>
          <Link to='/temas' className='text-decorator-none'>
            <Box mx={1} className='pointer'>
              <Typography variant="h6" color="inherit" className='text-navbar'>
                Temas
              </Typography>
            </Box>
          </Link>
          <Link to='/formularioTema' className='text-decorator-none'>
            <Box mx={1} className='pointer'>
              <Typography variant="h6" color="inherit" className='text-navbar'>
                Cadastrar temas
              </Typography>
            </Box>
          </Link>
        </Box>
        <Link to='/login' className='text-decorator-none'>
          <Box mx={1} className='pointer' onClick={goLogout}>
            <Typography variant="h6" color="inherit" className='text-navbar'>
              Logout
            </Typography>
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  }

  return (
    <>
      {navbarComponet}
    </>
  )
}

export default NavBar;
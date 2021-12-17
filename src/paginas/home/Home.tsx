import React, { useEffect } from 'react';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import './Home.css';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modealPostagem/ModalPostagem';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function Home() {

  let history = useHistory();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error('Usuário precisa estar logado!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
      history.push("/login")
    }
  }, [token])

  return (
    <div >
      <Grid container direction="row" justifyContent="center" alignItems="center" className='grid-login'>
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={10} className='box-bemvindo'>
            <Typography variant="h3" gutterBottom component="h3" align="center" className='title-1'>Seja bem vindo(a)! </Typography>
            <Typography variant="h5" gutterBottom component="h5" align="center" className='title-1'>Expresse aqui suas duvidas, curiosidades e muitos mais! Sobre o Mundo da Programação!</Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <ModalPostagem />
            </Box>
            <Link to='/posts' className='text-decorator-none'>
              <Button variant="outlined" className='botao'>Ver Postagens</Button>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box display="flex" justifyContent='center'>
            <Box>
              <img src="https://i.imgur.com/ca0V1Ou.png" alt="" width="666px" height="375px" />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid xs={12} className='postagens'>
        <TabPostagem />
      </Grid>
    </div>
  );
}

export default Home;
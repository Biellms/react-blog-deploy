import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Services';
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import './ListaPostagem.css';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  let history = useHistory();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado!', {
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

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])

  return (
    <>
      <Box marginTop={5} marginBottom={10}>
        {
          posts.map(post => (
            <Box justifyContent='center' display='flex'>
              <Box m={2} width="45%">
                <Card variant='outlined' className='card-postagem'>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom align='center' className='text-postagem'>
                      Postagens
                    </Typography>
                    <Typography variant="h5" component="h2" align='center' className='text-bold'>
                      {post.titulo}
                    </Typography>
                    <Typography variant="body2" component="p" align='justify' className='text-postagem'>
                      {post.texto}
                    </Typography>
                    <Typography variant="body2" component="p" className='text-bold-tema'>
                      Tema: {post.tema?.descricao}
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <Box display="flex" justifyContent="center" mb={1.5} className='card-actions'>
                      <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                        <Box mx={1}>
                          <Button variant="contained" size='small' color="primary" className='botao-atualizar'>
                            atualizar
                          </Button>
                        </Box>
                      </Link>
                      <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" size='small' color="secondary" className='botao-deletar'>
                            deletar
                          </Button>
                        </Box>
                      </Link>
                    </Box>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          ))

        }
      </Box>
    </>
  )
}

export default ListaPostagem;
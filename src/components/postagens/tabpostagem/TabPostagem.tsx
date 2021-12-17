import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography, Box, Grid } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';

function TabPostagem() {
  const [value, setValue] = useState('1')
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs value={value}
            centered
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            className='tab-postagem'>
            <Tab label="Todas as postagens" value="1" />
            <Tab label="Sobre" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1">
          <ListaPostagem />
        </TabPanel>
        <TabPanel value="2">
          <Grid container direction="row" justifyContent="center" alignItems="center" className='grid-login'>
            <Grid item xs={6}>
              <Box display="flex" justifyContent='center'>
                <Box>
                  <img src="https://i.imgur.com/r1RcOJK.png" alt="" width="850px" height="550px" />
                </Box>
              </Box>
            </Grid>
            <Grid alignItems="center" item xs={6}>
              <Box padding={10}>
              <Typography variant="h5" gutterBottom component="h5" align="center" className='title-1'>O CodeBlog é uma plataforma de postagens, da qual o usuário poderá publicar e compartilhar suas duvidas
                e até mesmo conhecimentos em relação ao mundo da programação! O objetivo é tornar os desenvolvedores e estudantes mais antenados no dia a dia da Técnologia da Informação. Onde tal
                tem liberdade de contribuir com seus conhecimentos.
              </Typography>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;

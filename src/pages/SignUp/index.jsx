import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { createUser } from '../../services/users';
import CopyrightDevHub from '../../components/CopyrightDevHub';
import { useSnack } from '../../hooks/useSnack';
import { useNavigate } from 'react-router-dom'
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
const theme = createTheme();

export default function SignUp() {
  const [userType, setUserType] = useState(1);
  const navigate = useNavigate();
  const { snack, handleSnackState, handleSnackOpen } = useSnack();
  const getAction = (cod_usuario) => {
    if (!cod_usuario) return
    return <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => { navigate(`/login`) }}
      >
        Entre agora
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="secondary"
        onClick={handleSnackOpen}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  }

  const handleSubmit = async (event) => {
    try {

      event.preventDefault();
      const data = new FormData(event.currentTarget);

      let email = data.get('email');
      let password = data.get('password');
      let userName = data.get('firstName');
      const  response  = await createUser(userName, email, password, userType);
      if (response.status === 200) {
        handleSnackState(
          {
            ...snack,
            action: getAction(response.data.cod_usuario),
            open: true,
            message: "Usuário Cadastrado com Sucesso!",
          }
        )
      }
      navigate('/');
    } catch (e) {
      console.log(e.response.data)
      handleSnackState(
        {
          ...snack,
          
          open: true, 
          message: e.response.data
        }
      )
      console.log(e);
    }
  }; 

  const handleUserType = (event) => {
    setUserType(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor:'primary.light' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome do usuário"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo de usuário</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo de usuário"
                    value={userType}
                    onChange={handleUserType}
                  >
                    <MenuItem value={1}>Usuário</MenuItem>
                    <MenuItem value={2}>Fornecedor</MenuItem>
                    <MenuItem value={3}>Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar Cadastro
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2" underline='hover'>
                  Já tem conta? Entre aqui
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
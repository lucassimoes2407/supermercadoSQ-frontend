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
import { login } from '../../services/users';
import { useNavigate } from 'react-router-dom'
import { loginJWT } from "../../services/auth";
import { getUserLogged } from '../../services/users';
import { useSnack } from '../../hooks/useSnack';




export default function LogIn() {


  const theme = createTheme();
  const navigate = useNavigate();
  const { snack, handleSnackState, handleSnackOpen } = useSnack();

  const loginErrMessage = (message) => {

    handleSnackState(
      {
        ...snack,
        open: true,
        message: message,
      }
    )
  }

  const handleLogin = async (username, senha) => {
    try {
      const response = await login(username, senha);


      if (response.status === 200) {
        loginJWT(response.data.token);

        (async () => {
          let getUserLoggedResponse = await getUserLogged();
          if (getUserLoggedResponse.data.user.acesso === 3) {
            navigate('/admin');
          }
        })();
        navigate('/')
        handleSnackState(
          {
            ...snack,
            open: true,
            message: "Você está logado!",
          }
        )

      }
    } catch (e) {
      console.log(e.response.data.message);
      loginErrMessage(e.response.data.message);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let username = data.get('username');
    let senha = data.get('senha');
    try {
      const responseLogin = await handleLogin(username, senha);
    } catch (e) {
      console.log(e);
    }
  };



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
          <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-senha"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <Link href="/signup" variant="body2" underline='hover'>
                  {"Não tem conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
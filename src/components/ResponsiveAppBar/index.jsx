import * as React from 'react';
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/logo.png';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';
import { getUserLogged } from '../../services/users';
import { isAuthenticated } from '../../services/auth';
import { useSnack } from '../../hooks/useSnack';


const ResponsiveAppBar = (props) => {


  const [username, setUsername] = useState('');
  const [isAuthe, setIsAuthe] = useState(false);
  const { isAuth, setIsAuth } = useSnack();

  const [settingsMenu, setSettingsMenu] = useState([
    { name: 'Entrar', path: 'login' },
    { name: 'Cadastre-se', path: 'signup' },
  ])

  let pages = [
    { name: 'Pesquisar', path: './' },
    { name: 'Sobre', path: 'about' },
  ];
  let settings = settingsMenu;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setIsAuthe(isAuthenticated());
    setAnchorElUser(event.currentTarget);

  };
  const handleCloseUserMenu = () => {
    setIsAuthe(isAuthenticated());
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handlePageButtonAction = (path) => {
    navigate(`/${path}`);
    handleCloseNavMenu();
  }

  useEffect(() => {
    try {
      if (isAuth) {
        (async () => {
          let getUserLoggedResponse = await getUserLogged();
          const { cod_usuario, username } = getUserLoggedResponse.data.user;
          setUsername(username)

          setSettingsMenu([
            { name: 'Perfil', path: `user/${cod_usuario}` },
            { name: 'Sair', path: 'logout' },
          ])
        })();
      } else {
        setUsername('')
        setSettingsMenu([
          { name: 'Entrar', path: 'login' },
          { name: 'Cadastre-se', path: 'signup' },
        ])
      }
    } catch (e) {
      console.log(e);
    }
  }, [isAuth]);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, [])

  const profileIcon = () => {
    if (!isAuth) {
      return (
        <Button
          onClick={handleOpenUserMenu}
          sx={{ my: 2, color: 'white' }}
          endIcon={<Avatar />} />
      )
    } else {
      return (
        <Tooltip title="Configuração de Usuário">
          <Button
            onClick={handleOpenUserMenu}
            sx={{ my: 2, color: 'white' }}
            endIcon={<Avatar />}>
            <Typography
              m={1}
              color={'primary.contrastText'}
            >
              {!username ? '' : username}
            </Typography>
          </Button>
        </Tooltip>
      )
    }
  }


  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => navigate(-1)}
            color="inherit"
          >
            <ArrowBackIos />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} alt="Logo" height={50} draggable="false" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handlePageButtonAction(page.path)}>

                  <Typography textAlign="center"

                  >{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} alt="Logo" height={50} draggable="false" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handlePageButtonAction(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {profileIcon()}

          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handlePageButtonAction(setting.path)}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;

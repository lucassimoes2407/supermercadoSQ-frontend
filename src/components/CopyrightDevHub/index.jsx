import React from "react";
import { Typography, Link, Box, Divider } from "@mui/material";
import './index.css'

import imagemDevHub from "../../assets/logo-devhub-mono-white.png";

const CopyrightDevHub = (props) => {
  return (
    <Box
      backgroundColor="primary.main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      gap={2}
      bottom={0}
      width="100%"
      height={50}
    >
      <img width={80} src={imagemDevHub} alt="DevHub" />
      
      <Typography
        mt="auto"
        mb="auto"
        variant="h1"
        fontSize={16}
        color="primary.contrastText"
        fontWeight={500}
      >
        {"Atlântico Academy Bootcamp - "}
        <Typography variant="a" href="https://github.com/lucassimoes2407/supermercadoSQ-frontend" target="_ablank">
          {"Equipe DevHub"}
        </Typography>{' © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default CopyrightDevHub;
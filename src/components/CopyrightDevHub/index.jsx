import React from "react";
import { Typography, Link, Box, Divider } from "@mui/material";
import './index.css'

import imagemDevHub from "../../assets/logo-devhub-mono-white.png";

const CopyrightDevHub = (props) => {
  return (
    <Box
      backgroundColor="primary.main"
      position="fixed"
      display="flex"
      justifyContent="center"
      bottom={0}
      width="100%"
      height={40}
    >
      <Link
        display="flex"
        justifyContent="center"
        gap={2}
        padding={1}
        width={450}

        href="https://github.com/lucassimoes2407/supermercadoSQ-frontend"
        target="_ablank"
        draggable="false"
        color="inherit"
        style={{ textDecoration: "none" }}
      >
        <img width={70} src={imagemDevHub} alt="DevHub" draggable="false" />

        <Typography
          mt="auto"
          mb="auto"
          variant="h1"
          fontSize={14}
          color="primary.contrastText"
          fontWeight={500}
        >
          {"Atlântico Academy Bootcamp - "}



          {"Equipe DevHub © "}{new Date().getFullYear()}.

        </Typography>
      </Link>
    </Box>
  );
}

export default CopyrightDevHub;
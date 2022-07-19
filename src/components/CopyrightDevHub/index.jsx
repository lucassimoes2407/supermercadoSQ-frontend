import React from "react";
import { Typography, Link } from "@mui/material";
import './index.css'

import imagemDevHub from "../../assets/logo-devhub-darkmode.png";

const CopyrightDevHub = (props) => {
  return (
    <footer>
      <img src={imagemDevHub} alt="DevHub" />
        <p>
          {'Atlântico Academy Bootcamp - '}
          <a color="inherit" href="https://github.com/lucassimoes2407/supermercadoSQ-frontend" target="_ablank">
            Equipe DevHub 
          </a>{' © '}
          {new Date().getFullYear()}
          {'.'}
        </p>    
    </footer>
  );
}

export default CopyrightDevHub;
import React from "react";
import { Typography, Link } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Atlântico Academy Bootcamp '}
      <Link color="inherit" href="https://github.com/lucassimoes2407/supermercadoSQ-frontend">
        DevHub ©
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright
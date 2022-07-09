import React from "react";
import { Typography, Link } from "@mui/material";

const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Atlântico Academy Bootcamp '}
        <Link color="inherit" href="https://mui.com/">
          DevHub ©
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright
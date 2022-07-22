import { createTheme, Typography } from "@mui/material";
import React from "react";
import { ThemeProvider } from "styled-components";
import NotFoundImg from "../../assets/NotFound.png"
import CopyrightDevHub from '../../components/CopyrightDevHub';
import FilterInput from "../../components/FilterInput";
import "./index.css"

const NotFound = () => {
	const theme = createTheme();
	return (<>
		<ThemeProvider theme={theme}>
			<Typography component="h1" variant="h4" color="primary" mt={14}>
				<b>Ops! A página não existe!</b>
			</Typography>
			<Typography component="h1" variant="h1" color="primary">
				<b>Erro 404</b>
			</Typography>
			<img src={NotFoundImg} alt="404" width={400} />
		</ThemeProvider>
	</>
	)
}

export default NotFound;
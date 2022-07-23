import React from "react";
import './About.css';
import { ThemeProvider } from "styled-components";
import { Box, Button, Chip, Container, createTheme, CssBaseline, Modal, Typography } from "@mui/material";

const About = () => {

	const theme = createTheme();

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<Box sx={{
					mt: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					textAlign: 'justify'
				}}
				>
					<Typography
						mt={3}
						variant="h1"
						fontSize={80}
						fontWeight={800}
						color="primary"
					>
						QUEM
					</Typography>

					<Typography
						variant="h1"
						fontSize={40}
						fontWeight={800}
						color="primary"
					>
						SOMOS?
					</Typography>

					<Typography
						mb={2}
						variant="subtitle1"
						color="text.prymary"
					>
						Uma plataforma de consulta e cadastro de produtos que tem como principal objetivo ajudar você a escolher os produtos que que se encaixam nas suas restrições alimentares.
					</Typography>
				</Box>


				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
					textAlign: 'justify'
				}}
				>
					<Typography
						mt={3}
						variant="h1"
						fontSize={80}
						fontWeight={800}
						color="primary"
					>
						O QUE
					</Typography>
					<Typography
						variant="h1"
						fontSize={40}
						fontWeight={800}
						color="primary"
					>
						FAZEMOS?
					</Typography>
					<Typography
						mb={2}
						variant="subtitle1"
						color="text.prymary"
					>
						Fornecemos uma plataforma de consulta de produtos que é nutrida constatemente pela comunidade, outros indivíduos que assim como você também tem restrições alimentares e se preocupam com o que ingerem.
						Nosso sistema permite uma pesquisa refinada de produtos por nome, ingrediente contido ou não e a opção de filtrar por restrições alimentares, tudo isso pra vc ter mais segurança e confiança na hora das compras.
					</Typography>
					<Button href="/">Pesquise Produtos</Button>
				</Box>


				<Box sx={{
					mb: 12,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					textAlign: 'justify'
				}}>
					<Typography
						mt={3}
						variant="h1"
						fontSize={80}
						fontWeight={800}
						color="primary"
					>
						COMO
					</Typography>

					<Typography
						variant="h1"
						fontSize={40}
						fontWeight={800}
						color="primary"
					>
						FUNCIONA?
					</Typography>

					<Typography
						mb={2}
						variant="subtitle1"
						color="text.prymary"
					>
						Basta acessar e pesquisar! Simples assim!
						Nosso mecanismo de busca permite que qualquer um possa pesquisar produtos, filtrar ingredientes e restrições facilmente sem necessidade de cadastro.
						Não encontrou o que procura? que tal criar uma conta e colaborar cadastrando produtos que mais tarde ajudarão milhares de pessoas?
					</Typography>
					<Button href="/signup">Cadastre-se</Button>
				</Box>

			</Container>
		</ThemeProvider>
	)
}

export default About;
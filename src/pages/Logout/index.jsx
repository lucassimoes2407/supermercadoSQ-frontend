import React from "react";
import "./index.css"
import { logoutUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Logout = () => {
	const navigate = useNavigate();

	logoutUser();
	useEffect(() => {
		navigate('/');
	});

	return (
		<Box mt={12} display="flex" justifyContent="center">
			<Typography
				mt={6}
				mb={6}
				variant="h1"
				fontSize={130}
				sx={{
					display: { xs: 'none', md: 'flex' },
				}}
			>
				😘
			</Typography>

			<Typography
				mt={6}
				mb={6}
				variant="h1"
				fontSize={90}
				sx={{
					display: { xs: 'flex', md: 'none' },
				}}
			>
				😘
			</Typography>
		</Box>
	);
}

export default Logout;



import React from "react";
import "./index.css"
import {logoutUser} from '../../services/auth';
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
const Logout = () => {
    const navigate = useNavigate();
    logoutUser();

    useEffect(() => {
        navigate('/');
    });

    return (<>
        <p>Usuário deslogado com sucesso!</p>
    </> );
}

export default Logout;



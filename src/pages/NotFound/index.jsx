import React from "react";
import NotFoundImg from "../../assets/NotFound.png"
import Copyright from "../../components/Copyright";
import "./index.css"

const NotFound = () => {
    return (
        <div>
            <h1 className="notfound__h1">Erro 404</h1>
            <h2 className="notfound__h2">Ops! Algo deu errado, a página não existe!</h2>

            <img className="notfound__img" src={NotFoundImg} alt="Ops! Algo deu errado, a página não existe!" />

            <Copyright/>
        </div>

)}

export default NotFound;
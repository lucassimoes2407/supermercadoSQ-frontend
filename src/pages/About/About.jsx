import React from "react";
import './About.css';
import Button from '@mui/material/Button';

const About = () => {

    return (
        <div>
            <br></br>
            <h1>
                Controle de restrições alimentícias SQ
            </h1>
            <br></br>
            <br></br>
            <div className="container">
                <p>
                    Sistema de gerenciamento de alimentos e composições alimentares para auxiliar nossos clientes a saber os componentes alergênicos de diversos produtos.
                </p>
                <br></br>
                <br></br>
                <div className="div2">
                    <p>
                        Qualquer pessoa pode fazer parte do nosso projeto!
                    </p>
                </div>
                <br></br>
                <br></br>
                <p>
                    Visite nossa página de <Button size="small" variant="contained" href="./signup">cadastro</Button> e insira seu nome, email, senha e o tipo de usuário e logo você terá permissão para adicionar e editar produtos você mesmo.
                </p>
                <br></br>
                <br></br>
                <div className="div2">
                    <p>
                        Você tem toda a liberdade de cadastrar seu próprio produto!
                    </p>
                </div>
                <br></br>
                <br></br>
                <p>
                    Cadastre um produto apertando no botão de <Button size="small" variant="contained" href="./create-product">Adicionar Produtos</Button> e insira o nome, a marca, os ingredientes e uma imagem do produto.
                </p>
                <br></br>
                <br></br>
                <div className="div2">
                    <p>
                        Diversas formas de pesquisar seus itens!
                    </p>
                </div>
                <br></br>
                <br></br>
                <p>
                    Na nossa <Button size="small" variant="contained" href="./">página inicial</Button> você pode pesquisar o produto pelo nome ou marca. Além disso, é possível escolher quais restrições alimentares e ingredientes você quer incluir ou excluir na pesquisa.
                </p>
                <br></br>
                <p>
                    Deseja encontrar apenas alimentos que contém glúten? Deseja excluir os alimentos com lactose? Você é quem decide!
                </p>
                <br></br>
                <br></br>
                <div className="div2">
                    <p>
                        Está faltando alguma restrição? Alguma restrição está com o nome errado? Nos ajude a corrigir!
                    </p>
                </div>
                <br></br>
                <br></br>
                <p>
                    Na página de restrições você pode cadastrar uma nova restrição ou editar alguma existente. Não apenas isso como também pode indicar qual alimento contém essa restrição.
                </p>
                <br></br>
                <br></br>
                <div className="div3">
                    <div className="div2">
                        <p>
                            Cadastre-se agora para ajudar outros clientes e venha fazer parte da família SQ!
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default About;
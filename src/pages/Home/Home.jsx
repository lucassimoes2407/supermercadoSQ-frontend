import { Accessibility } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { getAllProducts, postProduct } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";

const Home = () => {
    const [username, setUsername] = useState('')

    async function getProducts(){
        const allProducts = await getAllProducts();
        console.log(allProducts);
    }

    async function postProducts(){
        const allProducts = await postProduct("Goiabada", null, 'leite,goiaba', null, 6);
        console.log(allProducts);
    }

    async function getRestrictions(){
        const allRestrictions = await getAllRestrictions();
        console.log(allRestrictions);
    }

    async function logIn(){
        
    }

    return (
        <div className="home__div">
            <h1>Home</h1>
            <Button 
                variant="contained"
                startIcon={<Accessibility/>}
                onClick={() => getProducts()}
            >
                Get products
            </Button>
            <Button 
                variant="contained"
                startIcon={<Accessibility/>}
                onClick={() => postProducts()}
            >
                Post product
            </Button>
            <Button 
                variant="contained"
                startIcon={<Accessibility/>}
                onClick={() => getRestrictions()}
            >
                Get restrictions
            </Button>
            <Button 
                variant="contained"
                startIcon={<Accessibility/>}
                onClick={() => logIn()}
            >
                Login
            </Button>
        </div>
    ) 
}

export default Home;
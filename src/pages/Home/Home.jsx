import { Accessibility, Inventory, Login, NoMeals } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { getAllProducts, postProduct } from "../../services/product";
import { getAllRestrictions, getRestrictionByCod } from "../../services/restriction";

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

    async function getRestrictionCod(){
        const restriction = await getRestrictionByCod(2);
        console.log(restriction);
    }

    async function logIn(){
        
    }

    return (
        <div className="home__div">
            <h1>Home</h1>
            <Button 
                variant="contained"
                startIcon={<Inventory/>}
                onClick={() => getProducts()}
            >
                Get products
            </Button>
            <Button 
                variant="contained"
                startIcon={<Inventory/>}
                onClick={() => postProducts()}
            >
                Post product
            </Button>
            <Button 
                variant="contained"
                startIcon={<NoMeals/>}
                onClick={() => getRestrictions()}
            >
                Get restrictions
            </Button>
            <Button 
                variant="contained"
                startIcon={<NoMeals/>}
                onClick={() => getRestrictionCod()}
            >
                Get restriction by cod
            </Button>
            <Button 
                variant="contained"
                startIcon={<Login/>}
                onClick={() => logIn()}
            >
                Login
            </Button>
        </div>
    ) 
}

export default Home;
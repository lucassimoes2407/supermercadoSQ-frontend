import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import RecipeReviewCard from "../../components/ProductCard";
import { getAllProducts } from "../../services/product";
import './Home.css';


const Home = () => {
    const [productsDisplayed, setProductsDisplayed] = useState([]);
    const [restrictionsSelected, setRestrictionsSelected] = useState([]);
    const [restrictions, setRestrictions] = useState([]);


    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
          },
        },
      };

    const handleSubmit = (event) => {
        console.log("Submit");
    }

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setRestrictionsSelected(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    useEffect(() => {
        (async () => {
            let getProductResponse = await getAllProducts();
            setProductsDisplayed(getProductResponse.data);
        })()
    }, [])

    useEffect(() => {
        console.log(productsDisplayed);
    }, [productsDisplayed])


    return (
        <div className="home__div">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <h1>Home</h1>
                <TextField
                    size='medium'
                    required
                    id="product_name"
                    label="Qual produto está procurando?"
                    name="product_name"
                    autoComplete="product_name"
                    autoFocus
                    hiddenLabel
                    variant="outlined"
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={restrictionsSelected}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {restrictions.map((nome_restricao) => (
                            <MenuItem key={nome_restricao} value={nome_restricao}>
                                <Checkbox checked={restrictions.indexOf(nome_restricao) > -1} />
                                <ListItemText primary={nome_restricao} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="product__list">
                    {productsDisplayed.length > 0 && productsDisplayed.map((product) => {
                        return (
                            <RecipeReviewCard
                                key={`${product.cod_produto}`}
                                nome={product.nome}
                                marca={product.marca}
                                ingredientes={product.ingredientes}
                            />
                        )
                    })
                    }
                </div>
            </Box>
        </div>
    )
};

export default Home;
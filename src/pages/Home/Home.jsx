import { Box, Checkbox, Chip, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";
import './Home.css';


const Home = () => {
    const [productsDisplayed, setProductsDisplayed] = useState([]);
    const [restrictionsSelected, setRestrictionsSelected] = useState([]);
    const [restrictions, setRestrictions] = useState([
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder'
    ]);


    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder'
    ];

    const handleSubmit = (event) => {
        console.log("Submit");
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value);
        setRestrictionsSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        (async () => {
            let getProductResponse = await getAllProducts();
            console.log(getProductResponse);
            setProductsDisplayed(getProductResponse.data.productList);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let getRestrictionResponse = await getAllRestrictions();
            setRestrictions(getRestrictionResponse.data.map(restriction => restriction.nome_restricao));
        })();
    }, []);

    return (
        <div className="home__div">
            <Box justifyContent={'center'} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    <InputLabel id="demo-multiple-checkbox-label">Restrições</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={restrictionsSelected}
                        onChange={handleChange}
                        input={<OutlinedInput label="Restrições" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {restrictions.length > 0 && restrictions.map((nome_restricao) => (
                            <MenuItem key={nome_restricao} value={nome_restricao}>
                                <Checkbox checked={restrictionsSelected.indexOf(nome_restricao) > -1} />
                                <ListItemText primary={nome_restricao} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="restriction__accepted">
                    <Grid container justifyContent={'center'} gap={1}>
                        
                        {restrictionsSelected.map((element) => {
                            return (
                                <div className="restriction__item">
                                    <Chip
                                        onDelete={() => {}} 
                                        label={element}
                                        color="primary"
                                        />
                                </div>
                            )
                        })}
                    </Grid>
                </div>
                <div className="restriction__list">

                </div>
                <div className="product__list">
                    {productsDisplayed.length > 0 && productsDisplayed.map((product) => {
                        return (
                            <ProductCard
                                key={`${product.productInfo.cod_produto}`}
                                product={product}
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
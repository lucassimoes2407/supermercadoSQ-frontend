import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Chip, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { ExpandMore } from '@mui/icons-material'

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";
import './Home.css';
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();

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
      <Box justifyContent={'center'} component="form" onSubmit={handleSubmit} noValidate sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{ width: '90%' }}>
          <h1>Home</h1>
          <TextField
            fullWidth
            required
            id="product_name"
            label="Qual produto está procurando?"
            name="product_name"
            autoComplete="product_name"
            autoFocus
            hiddenLabel
            variant="outlined"
            sx={{ margin: 1 }}
          />
          {/* <div className=""> */}

          <Grid
            container
            spacing={1}
            flexDirection='column'
            alignItems={'center'}
            item xs={280}
          >
            <FormControl sx={{ m: 1, minWidth: 280 }} size="small">
              <InputLabel id="demo-multiple-checkbox-label">Remover Restrições</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={restrictionsSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Remover Restrições" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                sx={{ width: '280px' }}
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
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Restrições excluidas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {restrictionsSelected.map((element) => {
                      return (
                        <div className="restriction__item">
                          <Chip
                            onDelete={() => { }}
                            label={element}
                            color="primary"
                          />
                        </div>
                      )
                    })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
          {/* </div> */}
        </Box>
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
      <div className="add-product__div">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => navigate('/create-product')}
          color="secondary"
        >
          Adicionar Produto
        </Button>
      </div>
    </div>
  )
};

export default Home;
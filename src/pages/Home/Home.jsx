import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Chip, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { ExpandMore } from '@mui/icons-material'

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getAllProducts, getProductByName, getProductFiltered } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";
import './Home.css';
import { useNavigate } from "react-router-dom";
import FilterInput from "../../components/FilterInput";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsDisplayed, setProductsDisplayed] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [restrictionsSelected, setRestrictionsSelected] = useState([]);
  const [restrictionsIncluded, setRestrictionsIncluded] = useState([]);


  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 280,
      },
    },
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log("Submit");
  }

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setRestrictionsSelected(
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  const fetchProducts = async () => {
    let getProductResponse = await getAllProducts();
    setProductsDisplayed(getProductResponse.data.productList);
  }

  useEffect(() => {
    (async () => {
      let getProductResponse = await getAllProducts();
      setProductsDisplayed(getProductResponse.data.productList);
    })();
  }, []);

  
  useEffect(() => {
    (async () => {
      let getRestrictionResponse = await getAllRestrictions();
      setRestrictions(getRestrictionResponse.data.map(restriction => restriction.nome_restricao));
    })();
  }, []);
  

  const handleNomeProdutoChange = async (event) => {
    try{
      if(!event.target.value) {
        fetchProducts();
        return
      }
      const responseProductByName = await getProductByName(event.target.value);
      setProductsDisplayed(responseProductByName.data.productList)
    }catch(e){
      console.log(e);
    }
  }

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
            onChange={handleNomeProdutoChange}
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

          <div className="home-filter__div">
            <FilterInput
              items={restrictions.filter(restriction => !restrictionsIncluded.includes(restriction)) || []}
              title={'Remover Restrições'}
              acordeonTitle={'Restrições removidas'}
              updateSelecteds={(selected) => { setRestrictionsSelected(selected) }}
            />
            <FilterInput
              items={restrictions.filter(restriction => !restrictionsSelected.includes(restriction)) || []}
              title={'Incluir restrições'}
              acordeonTitle={'Restrições incluídas'}
              updateSelecteds={(selected) => { setRestrictionsIncluded(selected) }}
            />

          </div>
        </Box>

        <div className="product__list">
          {productsDisplayed.length > 0 && productsDisplayed.map((product) => {
            let conditionRemove = product.restrictions.some(element => {
              return restrictionsSelected.includes(element.nome_restricao)
            });

            let conditionInclude2 = restrictionsIncluded.length > 0 && !product.restrictions.some(element => {
              return restrictionsIncluded.includes(element.nome_restricao);
            });

            if (conditionRemove || conditionInclude2) return <></>;
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
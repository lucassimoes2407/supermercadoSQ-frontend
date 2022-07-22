import { Box, Button, Fab, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { postProductFiltered } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";
import { useNavigate } from "react-router-dom";
import FilterInput from "../../components/FilterInput";
import FilterInputText from "../../components/FilterInputText";
import './Home.css';


const Home = () => {
  const [productsDisplayed, setProductsDisplayed] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [restrictionsSelected, setRestrictionsSelected] = useState([]);
  const [restrictionsIncluded, setRestrictionsIncluded] = useState([]);
  const [ingredientIncluded, setIngredientIncluded] = useState([]);
  const [ingredientExcluded, setIngredientExcluded] = useState([]);
  const [productName, setProductName] = useState('');


  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log("Submit");
  }

  const sortProdutoByNome = (productList1, productList2) => {
    if (productList1.productInfo.nome.toUpperCase() < productList2.productInfo.nome.toUpperCase()) return -1;
    if (productList1.productInfo.nome.toUpperCase() === productList2.productInfo.nome.toUpperCase()) return 0;
    if (productList1.productInfo.nome.toUpperCase() > productList2.productInfo.nome.toUpperCase()) return 1;
  }

  const handleNomeProdutoChange = async (event) => {
    try {
      if (!event.target.value) {
        return
      }
      setProductName(event.target.value);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async () => {
      let getProductResponse = await postProductFiltered('', [], []);

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

  useEffect(() => {
    (async () => {
      const responseFilter = await postProductFiltered(productName, ingredientIncluded, ingredientExcluded);
      setProductsDisplayed(responseFilter.data.productList.sort(sortProdutoByNome));
    })()
  }, [ingredientIncluded, ingredientExcluded, productName]);

  return (
    <div className="home__div">
      <Box justifyContent={'center'} component="form" onSubmit={handleSubmit} noValidate sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box flexDirection="column" alignItems="center">
          <Typography
            mt={6}
            mb={6}
            fontWeight={500}
            variant="h1"
            fontSize={65}
            color="primary"
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            🤔 O que está procurando? 🤔
          </Typography>

          <Typography
            mt={6}
            mb={6}
            fontWeight={500}
            variant="h1"
            fontSize={40}
            color="primary"
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            O que está procurando? <br /> 🤔
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box flexDirection="column" alignItems="center">
            <TextField
              onChange={handleNomeProdutoChange}
              id="product_name"
              label="Qual produto está procurando?"
              name="product_name"
              autoComplete="product_name"
              autoFocus
              hiddenLabel
              sx={{
                width: 550,
                margin: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            />

            <TextField
              onChange={handleNomeProdutoChange}
              id="product_name"
              label="Qual produto está procurando?"
              name="product_name"
              autoComplete="product_name"
              autoFocus
              hiddenLabel
              sx={{
                width: 1100,
                margin: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            />
          </Box>

          <div className="home-filter__div">
            <div className="home-filter__div--child">

              <FilterInput
                items={restrictions.filter(restriction => !restrictionsSelected.includes(restriction)) || []}
                title={'Contém'}
                acordeonTitle={'Restrições incluídas'}
                updateSelecteds={(selected) => { setRestrictionsIncluded(selected) }}
              />
              <FilterInputText
                title={'Incluir ingredientes'}
                acordeonTitle={'Ingredientes incluídos'}
                updateSelecteds={(selected) => { setIngredientIncluded(selected) }}
              />

            </div>
            <div className="home-filter__div--child">

              <FilterInput
                items={restrictions.filter(restriction => !restrictionsIncluded.includes(restriction)) || []}
                title={'Não contém'}
                acordeonTitle={'Restrições excluídas'}
                updateSelecteds={(selected) => { setRestrictionsSelected(selected) }}
              />
              <FilterInputText
                title={'Excluir ingredientes'}
                acordeonTitle={'Ingredientes excluídos'}
                updateSelecteds={(selected) => { setIngredientExcluded(selected) }}
              />

            </div>
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
                key={`${product.productInfo.cod_produto}_productCard`}
                product={product}
              />
            )
          })
          }
        </div>

      </Box>
      <Box
        position="fixed"
        bottom={50}
        right={10}
        zIndex={1}
      >
        <Fab
          variant="extended"
          onClick={() => navigate('/create-product')}
          color="secondary"
        >
          <AddIcon sx={{ mr: 1 }} />
          Adicionar Produto
        </Fab>
      </Box>
    </div>
  )
};

export default Home;
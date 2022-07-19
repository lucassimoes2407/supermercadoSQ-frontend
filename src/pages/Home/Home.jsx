import { Box, Button, TextField } from "@mui/material";
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
            <FilterInputText
              title={'Incluir ingredientes'}
              acordeonTitle={'ingredientes incluídos'}
              updateSelecteds={(selected) => { setIngredientIncluded(selected) }}
            />
            <FilterInputText
              title={'Excluir ingredientes'}
              acordeonTitle={'Ingredientes excluir'}
              updateSelecteds={(selected) => { setIngredientExcluded(selected) }}
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
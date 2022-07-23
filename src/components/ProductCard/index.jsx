import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './index.css';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * 
 * @param {Object} props.product
 * @returns Card component with data displayed.
 */

function ProductCard(props) {
  const { productInfo } = props.product;

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 258, maxHeight: 258, minWidth: 258, minHeight: 258 }}
      className="product__card"
      onClick={() => { navigate(`/product/${productInfo.cod_produto}`) }}

    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.light" }} aria-label="recipe">
            <RestaurantIcon />
          </Avatar>
        }
        title={productInfo.nome}
        subheader={productInfo.marca}
      />

      <CardContent>
 
        <Typography
          fontWeight={500} fontSize={14} gutterBottom variant="h7" component="div" color="primary.dark">
          Restrições:
        </Typography>
        <div className="restriction__chip">

          {props.product && props.product.restrictions.map((element, index) => {
            if (index > 2) return '';
            return (
              <Chip
                key={element.nome_restricao + `productCardChip`}
                label={element.nome_restricao}
                color="primary"
              />
            )
          })}
          {props.product && props.product.restrictions.length > 2 &&
            <Chip
              key={`dot_productCardChip`}
              label={'...'}
              color="primary"
            />
          }
        </div>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
}

export default React.memo(ProductCard)
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Button, Chip } from '@mui/material';
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

export default function ProductCard(props) {
  const { productInfo } = props.product;

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 258, minWidth: 200, minHeight: 200 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <RestaurantIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={productInfo.nome}
        subheader={productInfo.marca}

      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        {/* <div className='product-ingredients__div'>
          <Typography variant="body2" color="text.secondary">
            {productInfo.ingredientes}
          </Typography>
        </div> */}
        <Typography gutterBottom variant="h7" component="div">
          Restrições
        </Typography>
        <div className="restriction__chip">

          {props.product && props.product.restrictions.map((element) => {
            return (
              <Chip
                key={element.nome_restricao}
                label={element.nome_restricao}
                color="primary"
              />
            )
          })}
        </div>
      </CardContent>
      <CardActions>
        <Button onClick={() => { navigate(`/product/${productInfo.cod_produto}`) }} size="small" color="primary">
          Ver mais
        </Button>
      </CardActions>
    </Card>
  );
}
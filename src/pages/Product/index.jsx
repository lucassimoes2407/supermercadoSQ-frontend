import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCod } from "../../services/product";
import ImageIcon from '@mui/icons-material/Image';
import "./index.css"
import { getUserByUserId } from "../../services/users";

const Product = () => {
    const [product, setProduct] = useState({productInfo: {}, user: {}, restrictions: []});

    const params = useParams();

    useEffect(() => {
        try {
            (async () => {
                const getProduct = await getProductByCod(params.cod);
                const {product} = getProduct.data;
                console.log(product);
                console.log(product.productInfo.nome);
                setProduct(product)
            })();
        }catch(e){
            console.log(e);
        }
    }, [params]);

    return(
        <div className="product__div">
            {(product.img_produto && 
                <img className="product__img" src={product.img_produto} alt="" />)
                || <div className="image__div--not-found">
                    <ImageIcon sx={{ fontSize: 120 }} /> 
                    Imagem não encontrada
                    </div>
            }
            
            <div className="product__div__content">
                <p className="product__p" >{product.productInfo.marca || 'marca'}</p>
                <h1 className="product__h1__nome">{(product.productInfo && product.productInfo.nome) || 'nome'}</h1>

                <h3 className="product__h3">Contém:</h3>

                <h3 className="product__h3">Ingredientes:</h3>
                <p>{product.productInfo.ingredientes || 'ingredientes'}</p>

                <h3 className="product__h3">Autor:</h3>
                <p>{product.user.username || 'nome usuário'}</p>
            </div>
        </div>
    )
}

export default Product;
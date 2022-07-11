import "./index.css"

const propsTest = [
	{
		"nome": "BISCOITO COM RECHEIO DE CHOCOLATE AMORI 140G",
		"marca": "RICHESTER",
		"ingredientes": "Farinha de trigo enriquecida com ferro e ácido fólico, açúcares, gordura vegetal, cacau, amido, sal, fermentos químicos: bicarbonato de amônio, pirofosfato ácido de sódio e bicarbonato de sódio, corante caramelo IV, emulsificante lecitina de soja e aromatizante.",
		"img_produto": "https://images-americanas.b2w.io/produtos/2891627607/imagens/biscoito-recheado-choc-amori-140g-richester/2891627607_1_large.jpg",
		"cod_usuario": 4,
		"cod_produto": 43
	}
]
;

const Product = (props) => {
    const {nome, marca, ingredientes, img_produto, cod_produto, cod_usuario} = propsTest[0];

    return(
        <div className="product__div">
            <img className="product__img" src={img_produto} alt="" />
            
            <div className="product__div__content">
                <h1 className="product__h1__nome">{nome}</h1>
                <p className="product__p" >{marca}</p>

                <h3 className="product__h3">Comtém:</h3>

                <h3 className="product__h3">Ingredientes:</h3>
                <p>{ingredientes}</p>

                <h3 className="product__h3">Autor:</h3>
                <p>{cod_usuario}</p>
            </div>
        </div>
    )
}

export default Product;
import backend_connection from "../config/api";

const getAllProducts = async () => {
    try{
        const allProducts = await backend_connection.get(`/products/`);
        return allProducts;
    }catch(e){
        console.log(e.message);
    }
}

const postProduct = async (nome, marca, ingredientes, img_produto, cod_usuario) => {
    try{
        const allProducts = await backend_connection.post('/products/', {nome, marca, ingredientes, img_produto, cod_usuario});
        return allProducts;
    }catch(e){
        console.log(e.message);
    }
}


export {
    getAllProducts,
    postProduct,
}
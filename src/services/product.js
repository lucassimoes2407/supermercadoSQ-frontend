import backend_connection from "../config/api";

const getAllProducts = async () => {
    try{
        const allProducts = await backend_connection.get(`/products/`);
        return allProducts;
    }catch(e){
        console.log(e.message);
    }
}

const getProductByCod = async (cod_produto) => {
    try{
        const allProducts = await backend_connection.get(`/products/${cod_produto}`);
        return allProducts;
    }catch(e){
        console.log(e.message);
    }
}

const getProductByName = async (nome_produto) => {
    try{
        const allProducts = await backend_connection.get(`/products/name/${nome_produto}`);
        return allProducts;
    }catch(e){
        console.log(e.message);
    }
}

const postProduct = async (nome, marca, ingredientes, img_produto, cod_usuario) => {
    try{ 
        console.log(nome)
        const postProduct = await backend_connection.post('/products/', {nome, marca, ingredientes, img_produto, cod_usuario});
        return postProduct;
    }catch(e){
        console.log(e);
    }
}

const getProductByUserCod = async (cod_usuario) => {
    try{
        const postProduct = await backend_connection.get(`/products/user/${cod_usuario}`);

        console.log(postProduct);

        return postProduct;
    }catch(e){
        console.log(e);
    }
}


export {
    getAllProducts,
    postProduct,
    getProductByCod,
    getProductByUserCod,
    getProductByName,
}
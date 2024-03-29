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
        const postProduct = await backend_connection.post('/products/', {nome, marca, ingredientes, img_produto, cod_usuario});
        return postProduct;
    }catch(e){
        console.log(e);
    }
}

const getProductByUserCod = async (cod_usuario) => {
    try{
        const getProductByUserCod = await backend_connection.get(`/products/user/${cod_usuario}`);

        return getProductByUserCod;
    }catch(e){
        console.log(e);
    }
}

const postProductFiltered = async (search, include_ingredients, exclude_ingredients) => {
    try{
        const postProductByUserCod = await backend_connection.post(`/products/filtered/`, {search, include_ingredients, exclude_ingredients});
        return postProductByUserCod;
    }catch(e){
        console.log(e);
    }
}

const putProduct = async (cod_produto, nome, marca, ingredientes, img_produto = null, cod_usuario) => {
    try{
        const postProduct = await backend_connection.put(`/products/`, {cod_produto, nome, marca, ingredientes, img_produto, cod_usuario});

        return postProduct;
    }catch(e){
        console.log(e);
    }
}

const deleteProduct = async (cod_produto) => {
    try{
        const deleteProduct = await backend_connection.delete(`/products/${cod_produto}`);

        return deleteProduct;
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
    putProduct,
    postProductFiltered,
    deleteProduct,
}
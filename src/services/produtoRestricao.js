import backend_connection from "../config/api";


const postProductRestriction = async (cod_produto, cod_restricao) => {
    try{ 
        const postProductRestrictionResponse = await backend_connection.post(`/product-restriction/${cod_produto}`, {cod_restricao});
        return postProductRestrictionResponse;
    }catch(e){
        console.log(e);
    }
}


export {
    postProductRestriction,
}
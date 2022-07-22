import backend_connection from "../config/api";


const postProductRestriction = async (cod_produto, cod_restricao) => {
    try{
        console.log(+cod_produto, +cod_restricao)
        const postProductRestrictionResponse = await backend_connection.post(`/product-restriction/${+cod_produto}`, {cod_restricao: +cod_restricao});
        return postProductRestrictionResponse;
    }catch(e){
        console.log(e);
    }
}

const deleteProductRestriction = async (cod_produto, cod_restricao) => {
    try{ 
        console.log(cod_produto, cod_restricao)
        const deleteProductRestrictionResponse = await backend_connection.delete(`/product-restriction/${+cod_produto}/${cod_restricao}`);
        return deleteProductRestrictionResponse;
    }catch(e){
        console.log(e);
    }
}


export {
    postProductRestriction,
    deleteProductRestriction,
}
import backend_connection from "../config/api";

const postUserRestriction = async (cod_usuario, cod_restricao) => {
    try{
        const postUserRestrictionResponse = await backend_connection.post(`/user-restriction/${+cod_usuario}`, {cod_restricao: +cod_restricao});
        return postUserRestrictionResponse;
    }catch(e){
        console.log(e);
    }
}

const deleteUserRestriction = async (cod_usuario, cod_restricao) => {
    try {
        const deleteUserRestrictionResponse = await backend_connection.delete(`/user-restriction/${+cod_usuario}/${+cod_restricao}`);
        return deleteUserRestrictionResponse;
    }catch(e) {
        console.log(e);
    }
}

export {
    postUserRestriction,
    deleteUserRestriction
}
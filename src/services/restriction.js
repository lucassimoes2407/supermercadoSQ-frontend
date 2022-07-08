import backend_connection from "../config/api";

const getAllRestrictions = async () => {
    try{
        const allRestrictions = await backend_connection.get(`/restriction/`);
        return allRestrictions;
    }catch(e){
        console.log(e.message);
    }
}

const getRestrictionByCod = async (cod_restriction) => {
    try {
        const restriction = await backend_connection.get(`/restriction/cod/${cod_restriction}`);
        return restriction;
    } catch (e) {
        console.log(e.message);
    }
}

export {
    getAllRestrictions,
    getRestrictionByCod,
}
import backend_connection from "../config/api";

const createUser = async (username, email, pass, typeUse) => {
    try{
        const responseCreate = await backend_connection.post('/users', {username, email, pass, typeUse});
        return responseCreate;
    }catch(err){
        throw err;
    }
}

export {
    createUser,
}
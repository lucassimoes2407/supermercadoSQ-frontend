import backend_connection from "../config/api";

const createUser = async (username, email, pass, typeUser) => {
    try{
        const responseCreate = await backend_connection.post('/users', {username, email, pass, typeUser});
        return responseCreate;
    }catch(err){
        throw err;
    }
}

const login = async (username, senha) => {
    try {
        const responseLogin = await backend_connection.post('/users/login', {username, senha});
        return responseLogin;
    }catch(err){
        throw err;
    }
}

export {
    createUser,
    login
}
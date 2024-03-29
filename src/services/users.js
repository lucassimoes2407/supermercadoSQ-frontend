import backend_connection from "../config/api";

const createUser = async (username, email, pass, typeUser) => {
    try{
        const responseCreate = await backend_connection.post('/users', {username, email, pass, typeUser});
        return responseCreate;
    }catch(err){
        throw err;
    }
}
const getUserLogged = async () => { //users/getlogged
    try{
        const responseGetLogged = await backend_connection.get('/users/getlogged');
        return responseGetLogged;
    }catch(err){
        throw err;
    }
}

const login = async (username, pass) => {
    try {
        const responseLogin = await backend_connection.post('/users/login', {username, pass});
        return responseLogin;
    }catch(err){
        throw err;
    }
}

const logout = async (token) => {
    try {
        const responseLogout = await backend_connection.post('/users/logout', {token})
        return responseLogout;
    }catch(err){
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const responseGetAllUsers = await backend_connection.get('/users/');
        return responseGetAllUsers;
    }catch(err){
        throw err;
    }
}

const getUserByUserName = async(username) => {
    try {
        const responseGetUserByUserName = await backend_connection.get(`/users/username/${username}`);
        return responseGetUserByUserName;
    }catch(err){
        throw err;
    }
}

const getUserByUserId = async(id) => {
    try {
        const responseGetUserByUserId = await backend_connection.get(`/users/id/${id}`);
        return responseGetUserByUserId;
    }catch(err){
        throw err;
    }
}


const getUsersActive = async() => {
    try {
        const responseGetUsersActive = await backend_connection.get('/users/findUsersActive');
        return responseGetUsersActive;
    }catch(err){
        throw err;
    }
}
const getUsersInactive = async() => {
    try {
        const responseGetUsersInactive = await backend_connection.get('/users/findUsersInactive');
        return responseGetUsersInactive
    }catch(err){
        throw err;
    }
}

const updateUser = async(id,username,email, pass) => {
    try {
        const responseUpdateUser = await backend_connection.put(`/users/${id}`, {username, email, pass});
        return responseUpdateUser;
    }catch(err){
        throw err;
    }
}
const setUserActiveAttribute = async(id) => {
    
    try {
        const responseSetUserActiveAttribute = await backend_connection.put(`/users/setUserActiveAttribute/${id}`);
        return responseSetUserActiveAttribute;
    }catch(err){
        throw err;
    }
}
const deleteUserByUserName = async(username) => {
    try {
        const responseDeleteUserByUserName = await backend_connection.delete(`/users/${username}`);
        return responseDeleteUserByUserName;
    }catch(err){
        throw err;
    }
}
const deleteUserById = async(cod_usuario) => {
    try {
        const responseDeleteUserById = await backend_connection.delete(`/users/id/${cod_usuario}`);
        return responseDeleteUserById;
    }catch(err){
        throw err;
    }
}


export {
    createUser,
    getUserLogged,
    login,
    logout,
    getAllUsers,
    getUserByUserName,
    getUserByUserId,
    getUsersActive,
    getUsersInactive,
    updateUser,
    setUserActiveAttribute,
    deleteUserByUserName,
    deleteUserById
}
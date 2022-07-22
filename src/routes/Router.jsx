import { Routes, Route} from "react-router-dom";
import About from "../pages/About/About";
import Home from '../pages/Home/Home'
import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import CreateProduct from "../pages/CreateProduct";
import User from "../pages/User";
import Admin from "../pages/Admin";
import EditProduct from "../pages/EditProduct";
import Logout from "../pages/Logout"

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="about" element={<About/>} />
            <Route path="login" element={<LogIn/>} />
            <Route path="notfound" element={<NotFound/>} />
            <Route path="user/:cod_usuario" element={<User />} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="*" element={<NotFound/>}/>
            <Route path="product/:cod" element={<Product/>}/>
            <Route path="product/:cod/edit" element={<EditProduct/>}/>
            <Route path="create-product" element={<CreateProduct/>}/>
            <Route path="admin" element={<Admin/>}/>
            <Route path="logout" element={<Logout/>}/>
        </Routes>
    )
};

export default RouterConfig;
import { Routes, Route} from "react-router-dom";
import About from "../pages/About/About";
import Home from '../pages/Home/Home'
import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="about" element={<About/>} />
            <Route path="login" element={<LogIn/>} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="*" element={<NotFound/>}/>
            <Route path="product" element={<Product/>}/>
        </Routes>
    )
};

export default RouterConfig;
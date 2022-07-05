import { Routes, Route } from "react-router-dom";
import About from "../pages/About/About";
import Home from '../pages/Home/Home'

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="about" element={<About/>} />
        </Routes>
    )
};

export default RouterConfig;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByUserCod } from "../../services/product";
import { getUserByUserId } from "../../services/users";

const User = () => {
    const [user, setUser] = useState({
        user: {},
        userRestrictions: {},
        products: []
    });
    const params = useParams();

    useEffect(() => {
        console.log(user);
    }, [user])

    useEffect(() => {
        try {
            (async () => {
                const getUser = await getUserByUserId(params.cod_usuario);
                const getProducts = await getProductByUserCod(params.cod_usuario);

                const userData = getUser.data.user;
                const restrictions = getUser.data.userRestrictions;
                const products = getProducts.data.productList;

                setUser({...userData, restrictions, products})
            })();
        }catch(e){
            console.log(e);
        }
    }, [params]);

    return (
        <div className="user__div">
            <h1>{}</h1>
        </div>
    )
}

export default User;
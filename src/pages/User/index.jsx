import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUserId } from "../../services/users";

const User = () => {
    const [user, setUser] = useState({

    });
    const params = useParams();

    useEffect(() => {
        try {
            (async () => {
                const getUser = await getUserByUserId(params.cod);
                console.log(getUser);
            })();
        }catch(e){
            console.log(e);
        }
    }, [params]);

    return (
        <div className="user__div">
            <>hi</>
        </div>
    )
}

export default User;
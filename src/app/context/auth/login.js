import fetcher from "../../services/fetcher"
import React, {useState} from "react";


const Login = async (details, type) => {
    const result = await fetcher("POST", details , "/auth/login", type);
    return result;
}

export default Login
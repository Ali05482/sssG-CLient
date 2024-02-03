import getFetcher from "../../services/getFetcher"
import React, {useState} from "react";


const getAllUsers = async () => {
    const result = await getFetcher("GET", '' , "/user/view/all");
    return result;
}

export default getAllUsers
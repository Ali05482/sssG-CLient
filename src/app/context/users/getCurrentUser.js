import getFetcher from "../../services/getFetcher"
import React, {useState} from "react";


const getCurrentUser = async (userId) => {
    const result = await getFetcher("GET", '' , `/user/view/specific/unique/${userId}`);
    return result;
}

export default getCurrentUser
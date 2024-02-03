import getFetcher from "../../services/getFetcher"
import React, {useState} from "react";


const getDoctorsForScheduling = async () => {
    const result = await getFetcher("GET", '' , `/doctor/getDoctorsForScheduling`);
    return result;
}

export default getDoctorsForScheduling
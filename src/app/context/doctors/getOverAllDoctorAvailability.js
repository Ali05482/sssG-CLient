import getFetcher from "../../services/getFetcher"
import React, {useState} from "react";


const getOverAllDoctorAvailability = async (id) => {
    const result = await getFetcher("GET", '' , `/doctor/getOverAllDoctorAvailability/${id}`);
    return result;
}

export default getOverAllDoctorAvailability
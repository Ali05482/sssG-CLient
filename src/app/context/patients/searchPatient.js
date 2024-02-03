import getFetcher from "../../services/getFetcher"
import React, {useState} from "react";


const searchPatient = async (patientData) => {
    const result = await getFetcher("GET", '' , `/patient/search/${patientData}`, );
    return result;
}

export default searchPatient
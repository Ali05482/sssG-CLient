import fetcher from "../../services/fetcher"
import React, {useState} from "react";


const patientSignUp = async (details, type) => {
    const result = await fetcher("POST", details , "/patient/addPatientOnly", type);
    return result;
}

export default patientSignUp
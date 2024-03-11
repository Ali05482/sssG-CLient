import getFetcher from "../../services/getFetcher"


const fetchPatients = async (patientData) => {
    const result = await getFetcher("GET", '' , `/patient/fetchPatients`, );
    return result;
}

export default fetchPatients
import getFetcher from "../../services/getFetcher"


const getAllDoctors = async (patientId) => {
    const result = await getFetcher("GET", '' , `/doctor/getAll/${patientId}`);
    return result;
}

export default getAllDoctors
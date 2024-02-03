import getFetcher from "../../services/getFetcher"


const getAllClinics = async () => {
    const result = await getFetcher("GET", '' , "/clinic/getAll");
    return result;
}

export default getAllClinics
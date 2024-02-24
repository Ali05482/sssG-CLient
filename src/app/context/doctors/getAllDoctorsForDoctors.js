import getFetcher from "../../services/getFetcher"


const getAllDoctorsForDoctors = async () => {
    const result = await getFetcher("GET", '' , `/doctor/getAllDoctorsForDoctors`);
    return result;
}

export default getAllDoctorsForDoctors
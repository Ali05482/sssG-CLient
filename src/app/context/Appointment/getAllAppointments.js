import getFetcher from "../../services/getFetcher"

const getAllAppointments = async () => {
    const result = await getFetcher("GET", '' , "/appointment/getAll");
    return result;
}

export default getAllAppointments
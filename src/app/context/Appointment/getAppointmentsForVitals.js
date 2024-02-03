import getFetcher from "../../services/getFetcher"

const getAppointmentsForVitals = async () => {
    const result = await getFetcher("GET", '' , "/appointment/getAppointmentsForVitals");
    return result;
}

export default getAppointmentsForVitals
import getFetcher from "../../services/getFetcher"

const getAppointmentsForScheduling = async () => {
    const result = await getFetcher("GET", '' , "/appointment/getAppointmentsForScheduling");
    return result;
}

export default getAppointmentsForScheduling
import getFetcher from "../../services/getFetcher"

const getAppointmentsForCare = async () => {
    const result = await getFetcher("GET", '' , "/appointment/getAppointmentsForCare");
    return result;
}

export default getAppointmentsForCare
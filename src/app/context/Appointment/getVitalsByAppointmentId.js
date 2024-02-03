import getFetcher from "../../services/getFetcher"

const getVitalsByAppointmentId = async (appointmentId) => {
    const result = await getFetcher("GET", '' , `/answer/getVitalsByAppointmentId/${appointmentId}`);
    return result;
}

export default getVitalsByAppointmentId;
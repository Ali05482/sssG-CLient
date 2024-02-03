import getFetcher from "../../services/getFetcher"

const getDoctorReservedAppointments = async (id) => {
    const result = await getFetcher("GET", '' , "/doctor/getDoctorReservedAppointments/" + id);
    return result;
}

export default getDoctorReservedAppointments
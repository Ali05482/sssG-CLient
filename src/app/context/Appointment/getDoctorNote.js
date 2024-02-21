import getFetcher from "../../services/getFetcher"

const getDoctorNote = async (appointmentId) => {
    const result = await getFetcher("GET", '', `/appointment/getDoctorNote/${appointmentId}`);
    return result;
}

export default getDoctorNote;
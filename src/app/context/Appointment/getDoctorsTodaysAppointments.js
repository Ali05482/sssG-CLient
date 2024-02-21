import getFetcher from "../../services/getFetcher"

const getDoctorsTodaysAppointments = async () => {
    const result = await getFetcher("GET", '', `/appointment/getDoctorsTodaysAppointments`);
    return result;
}

export default getDoctorsTodaysAppointments;
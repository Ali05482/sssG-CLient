import getFetcher from "../../services/getFetcher"
const getAppointmentsForMeeting = async () => {
    const result = await getFetcher("GET", '' , `/appointment/getAppointmentsForMeeting`);
    return result;
}
export default getAppointmentsForMeeting
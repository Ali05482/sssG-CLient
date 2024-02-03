import getFetcher from "../../services/getFetcher"


const getReferralByAppointmentId = async (getReferralByAppointmentId) => {
    const result = await getFetcher("GET", '' , `/reports/getReferralByAppointmentId/${getReferralByAppointmentId}`, );
    return result;
}

export default getReferralByAppointmentId
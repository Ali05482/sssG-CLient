import getFetcher from "../../services/getFetcher"


const getReferralByReferDoctorId = async () => {
    const result = await getFetcher("GET", '' , `/reports/getReferralByReferDoctorId`, );
    return result;
}

export default getReferralByReferDoctorId
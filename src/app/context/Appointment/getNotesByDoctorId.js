import getFetcher from "../../services/getFetcher"

const getNotesByDoctorId = async (patientId) => {
    const result = await getFetcher("GET", '', `/appointment/getNotesByDoctorId/${patientId}`);
    return result;
}

export default getNotesByDoctorId;
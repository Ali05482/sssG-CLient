import getFetcher from "../../services/getFetcher"


const getPrescription = async (sickNoteId) => {
    const result = await getFetcher("GET", '' , `/reports/getPrescriptionByAppointmentId/${sickNoteId}`, );
    return result;
}

export default getPrescription
import getFetcher from "../../services/getFetcher"


const getSickNote = async (sickNoteId) => {
    const result = await getFetcher("GET", '' , `/reports/getSickNoteByAppointmentId/${sickNoteId}`, );
    return result;
}

export default getSickNote
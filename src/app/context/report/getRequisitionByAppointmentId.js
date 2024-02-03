import getFetcher from "../../services/getFetcher"


const getRequisitionByAppointmentId = async (getRequisitionByAppointmentId) => {
    const result = await getFetcher("GET", '' , `/reports/getRequisitionByAppointmentId/${getRequisitionByAppointmentId}`, );
    return result;
}

export default getRequisitionByAppointmentId
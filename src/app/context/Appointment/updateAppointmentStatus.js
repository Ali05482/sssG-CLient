import fetcher from "../../services/fetcher";

const updateAppointmentStatus = async (data ,id, type) => {
  const result = await fetcher("PUT", data, `/appointment/updateAppointmentStatus/${id}`, type);
  return result;
};

export default updateAppointmentStatus;

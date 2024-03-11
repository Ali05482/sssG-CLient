import fetcher from "../../services/fetcher";

const editAppointment = async (data ,id, type) => {
  const result = await fetcher("PUT", data, `/appointment/editAppointment/${id}`, type);
  return result;
};

export default editAppointment;

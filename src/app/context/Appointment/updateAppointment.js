import fetcher from "../../services/fetcher";

const updateAppointment = async (data, type) => {
  const result = await fetcher("PUT", data, "/appointment/updateAppointment", type);
  return result;
};

export default updateAppointment;

import fetcher from "../../services/fetcher";

const addAppointmentOnly = async (data , type) => {
  const result = await fetcher("POST", data, "/appointment/only/appointment/add", type);
  return result;
};

export default addAppointmentOnly;

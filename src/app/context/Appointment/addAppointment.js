import fetcher from "../../services/fetcher";

const addAppointment = async (data , type) => {
  const result = await fetcher("POST", data, "/appointment/add/both", type);
  return result;
};

export default addAppointment;

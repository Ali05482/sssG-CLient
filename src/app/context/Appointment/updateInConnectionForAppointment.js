import fetcher from "../../services/fetcher";

const updateInConnectionForAppointment = async (data, type) => {
  const result = await fetcher("POST", data, "/appointment/updateInConnectionForAppointment", type);
  return result;
};

export default updateInConnectionForAppointment;

import fetcher from "../../services/fetcher";

const addDoctorAvailability = async (data , type) => {
  const result = await fetcher("POST", data, "/doctor/schedule/createAndUpdate", type);
  return result;
};

export default addDoctorAvailability;

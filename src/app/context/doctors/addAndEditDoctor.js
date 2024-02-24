import fetcher from "../../services/fetcher";

const addAndEditDoctor = async (data , type) => {
  const result = await fetcher("POST", data, "/doctor/addAndEditDoctor", type);
  return result;
};

export default addAndEditDoctor;

import fetcher from "../../services/fetcher";

const addClinic = async (data , type) => {
  const result = await fetcher("POST", data, "/clinic/add", type);
  return result;
};

export default addClinic;

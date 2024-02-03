import fetcher from "../../services/fetcher";

const addVitals = async (data , type) => {
  const result = await fetcher("POST", data, "/appointment/vitals/add", type);
  return result;
};

export default addVitals;

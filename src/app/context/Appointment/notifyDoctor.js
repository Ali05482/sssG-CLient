import fetcher from "../../services/fetcher";

const notifyDoctor = async (data, type) => {
  const result = await fetcher("POST", data, "/appointment/notifyDoctor", type);
  return result;
};

export default notifyDoctor;

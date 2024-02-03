import fetcher from "../../services/fetcher";

const collectAnswer = async (data ,appointmentId, type) => {

  const result = await fetcher("POST", data, `/answer/collectAnswer/${appointmentId}`, type);
  return result;
};

export default collectAnswer;
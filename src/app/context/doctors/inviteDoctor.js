import fetcher from "../../services/fetcher";

const inviteDoctor = async (data , type) => {
  const result = await fetcher("POST", data, "/doctor/inviteDoctor", type);
  return result;
};

export default inviteDoctor;

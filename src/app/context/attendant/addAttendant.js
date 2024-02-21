import fetcher from "../../services/fetcher";

const addAttendant = async (data , type) => {

const result = await fetcher("POST", data, "/user/clinic/add", type);
  return result;
};

export default addAttendant;

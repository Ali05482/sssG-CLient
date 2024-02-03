import fetcher from "../../services/fetcher";

const addUser = async (data , type) => {

  const result = await fetcher("POST", data, "/user/add", type);
  return result;
};

export default addUser;

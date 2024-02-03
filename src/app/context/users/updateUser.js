import fetcher from "../../services/fetcher";

const updateUser = async (data , type) => {

  const result = await fetcher("PUT", data, `/user/edit/${data.userId}`, type);
  return result;
};

export default updateUser;

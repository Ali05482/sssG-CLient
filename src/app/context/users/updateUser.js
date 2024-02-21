import fetcher from "../../services/fetcher";

const updateUser = async (data , userId,type) => {

  const result = await fetcher("PUT", data, `/user/edit/${userId}`, type);
  return result;
};

export default updateUser;

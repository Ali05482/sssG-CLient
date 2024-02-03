import fetcher from "../../services/fetcher";

const addPlatform = async (data , type) => {
  const result = await fetcher("POST", data, "/platform/add", type);
  return result;
};

export default addPlatform;

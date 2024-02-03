import fetcher from "../../services/fetcher";

const createQuestionaire = async (data , type) => {

  const result = await fetcher("POST", data, "/answer/addBulk", type);
  return result;
};

export default createQuestionaire;

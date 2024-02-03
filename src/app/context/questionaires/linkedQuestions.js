import fetcher from "../../services/fetcher";

const linkedQuestions = async (data , type) => {

  const result = await fetcher("POST", data, "/answer/linkedQuestion", type);
  return result;
};

export default linkedQuestions;

import fetcher from "../../../services/fetcher";

const addAnswerWithQuestionId = async (data, type) => {

  const result = await fetcher("POST", data, `/answer/addAnswerWithQuestionId`, type);
  return result;
};

export default addAnswerWithQuestionId;
import fetcher from "../../../services/fetcher";

const editAnswerWithQuestionId = async (data, answerId,type) => {

  const result = await fetcher("PUT", data, `/answer/editAnswerWithQuestionId/${answerId}`, type);
  return result;
};

export default editAnswerWithQuestionId;
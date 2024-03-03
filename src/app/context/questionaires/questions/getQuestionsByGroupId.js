import getFetcher from "../../../services/getFetcher";

const deleteQuestionById = async (questionId, type) => {
  const result = await getFetcher("DELETE", '', `/question/deleteQuestionById/${questionId}`, type);
  return result;
};

export default deleteQuestionById;

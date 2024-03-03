import getFetcher from "../../../services/getFetcher";

const deleteAnswerById = async (answerId , type) => {
  const result = await getFetcher("DELETE", '', `/answer/deleteAnswerById/${answerId}`, type);
  return result;
};

export default deleteAnswerById;

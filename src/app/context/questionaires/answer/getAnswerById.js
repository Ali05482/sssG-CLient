import getFetcher from "../../../services/getFetcher";

const getAnswerById = async (answerId, type) => {
  const result = await getFetcher("GET", '', `/answer/getAnswerById/${answerId}`, type);
  return result;
};

export default getAnswerById;

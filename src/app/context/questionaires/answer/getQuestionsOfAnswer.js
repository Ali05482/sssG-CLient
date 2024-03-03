import getFetcher from "../../../services/getFetcher";

const getQuestionsOfAnswer = async (answerId, type) => {
  const result = await getFetcher("GET", '', `/question/getQuestionsOfAnswer/${answerId}`, type);
  return result;
};

export default getQuestionsOfAnswer;

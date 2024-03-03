import fetcher from "../../../services/fetcher";

const unLinkQuestionsFromAnswers = async (answerId, questionId, type) => {
  const result = await fetcher("PUT", { questionId }, `/question/unLinkQuestionsFromAnswers/${answerId}`, type);
  return result;
};

export default unLinkQuestionsFromAnswers;
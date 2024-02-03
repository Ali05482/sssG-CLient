import fetcher from "../../services/fetcher";
const updateQuestion = async (data ,questionId,) => {

  const result = await fetcher("PUT", data, `/question/edit/${questionId}`);
  return result;
};

export default updateQuestion;
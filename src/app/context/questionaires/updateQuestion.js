import fetcher from "../../services/fetcher";
const updateQuestion = async (data ,questionId,type) => {

  const result = await fetcher("PUT", data, `/question/edit/${questionId}`, type);
  return result;
};

export default updateQuestion;
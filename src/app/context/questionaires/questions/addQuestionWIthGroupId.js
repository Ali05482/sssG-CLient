import fetcher from "../../../services/fetcher";

const addQuestionWIthGroupId = async (data , type) => {

  const result = await fetcher("POST", data, `/question/addQuestionWIthGroupId`, type);
  return result;
};

export default addQuestionWIthGroupId;
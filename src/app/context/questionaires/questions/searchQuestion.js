import getFetcher from "../../../services/getFetcher";

const searchQuestion = async (data , type) => {
  const result = await getFetcher("GET", data, `/question/searchQuestion/${data?.search}/${data?.type}/${data?.id}`, type);
  return result;
};

export default searchQuestion;

import fetcher from "../../../services/fetcher";

const addFolder = async (data , type) => {
  const result = await fetcher("POST", data, "/question-folder/add", type);
  return result;
};

export default addFolder;

import fetcher from "../../services/fetcher";

const addAndUpdateSickNote = async (data , type) => {

  const result = await fetcher("POST", data, "/reports/addAndUpdateSickNote", type);
  return result;
};

export default addAndUpdateSickNote;
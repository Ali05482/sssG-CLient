import fetcher from "../../services/fetcher";

const addAndUpdateRequisition = async (data , type) => {

  const result = await fetcher("POST", data, "/reports/addAndUpdateRequisition", type);
  return result;
};

export default addAndUpdateRequisition;
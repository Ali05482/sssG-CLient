import fetcher from "../../services/fetcher";

const addAndUpdateReferral = async (data , type) => {

  const result = await fetcher("POST", data, "/reports/addAndUpdateReferral", type);
  return result;
};

export default addAndUpdateReferral;
import fetcher from "../../services/fetcher";

const addAndUpdatePrescription = async (data , type) => {

  const result = await fetcher("POST", data, "/reports/addAndUpdatePrescription", type);
  return result;
};

export default addAndUpdatePrescription;
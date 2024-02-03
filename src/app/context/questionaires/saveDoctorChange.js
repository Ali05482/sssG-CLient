import fetcher from "../../services/fetcher";

const saveDoctorChange = async (data , type) => {

  const result = await fetcher("POST", data, `/answer/saveDoctorChanges`, type);
  return result;
};

export default saveDoctorChange;
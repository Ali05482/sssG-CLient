import getFetcher from "../../services/getFetcher";

const getAllPlatForm = async (data ) => {
  const result = await getFetcher("GET", data, "/platform/getAll");
  return result;
};

export default getAllPlatForm;

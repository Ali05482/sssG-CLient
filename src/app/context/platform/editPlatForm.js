import fetcher from "../../services/fetcher";

const editPlatForm = async (data ,platformId, type) => {
  const result = await fetcher("PUT", data, `/platform/edit${platformId}`, type);
  return result;
};

export default editPlatForm;

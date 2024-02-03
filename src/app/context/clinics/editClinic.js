import fetcher from "../../services/fetcher";

const editClinic = async (data ,id, type) => {
  const result = await fetcher("PUT", data, `/clinic/edit/${id}`, type);
  return result;
};

export default editClinic;

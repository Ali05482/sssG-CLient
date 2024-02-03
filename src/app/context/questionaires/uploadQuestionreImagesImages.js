import fetcher from "../../services/fetcher";

const uploadQuestionreImagesImages = async (data, type) => {

  const result = await fetcher("POST", data, `/answer/uploadQuestionaireImages`, type);
  return result;
};

export default uploadQuestionreImagesImages;
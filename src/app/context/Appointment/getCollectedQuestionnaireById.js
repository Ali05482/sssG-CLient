import getFetcher from "../../services/getFetcher"

const getCollectedQuestionnaireById = async (questionaireId) => {
    const result = await getFetcher("GET", '' , `/answer/getCollectedQuestioanireById/${questionaireId}`);
    return result;
}

export default getCollectedQuestionnaireById;
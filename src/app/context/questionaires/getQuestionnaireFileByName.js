import getFetcher from "../../services/getFetcher"
const getQuestionnaireFileByName = async (fileName) => {
    const result = await getFetcher("GET", '' , `/upload/questionnaire/${fileName}`);
    return result;
}
export default getQuestionnaireFileByName
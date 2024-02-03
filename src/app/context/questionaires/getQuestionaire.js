import getFetcher from "../../services/getFetcher"
const getQuestionaire = async (questionId) => {
    const result = await getFetcher("GET", '' , `/question-group/getAllQuestionAnswer/${questionId}`);
    return result;
}
export default getQuestionaire
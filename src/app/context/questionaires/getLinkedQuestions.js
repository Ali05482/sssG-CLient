import getFetcher from "../../services/getFetcher"
const getLinkedQuestions = async (questionId) => {
    const result = await getFetcher("GET", '' , '/question/getLinkedQuestions');
    return result;
}
export default getLinkedQuestions
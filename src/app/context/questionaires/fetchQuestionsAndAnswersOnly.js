import getFetcher from "../../services/getFetcher"
const fetchQuestionsAndAnswersOnly = async () => {
    const result = await getFetcher("GET", '' , `/question/getAllQuestionsAndAnswers/`);
    return result;
}
export default fetchQuestionsAndAnswersOnly
import getFetcher from "../../services/getFetcher"
const getCollectedQuestionnaire = async () => {
    const result = await getFetcher("GET", '' , `/answer/getCollectedQuestioanire/`);
    return result;
}
export default getCollectedQuestionnaire
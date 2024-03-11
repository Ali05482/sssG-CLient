import getFetcher from "../../services/getFetcher"
const getCollectedQuestionnaire = async (appointmentId) => {
    const result = await getFetcher("GET", '' , `/answer/getCollectedQuestioanire/${appointmentId}`);
    return result;
}
export default getCollectedQuestionnaire
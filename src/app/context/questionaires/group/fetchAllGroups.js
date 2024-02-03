import getFetcher from "../../../services/getFetcher"
const fetchAllGroups = async (folderId) => {
    const result = await getFetcher("GET", '' , `/question-group/getAll`);
    console.log("result from contesxt", result)
    return result;
}

export default fetchAllGroups
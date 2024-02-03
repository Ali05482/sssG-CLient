import getFetcher from "../../../services/getFetcher"
const fetchAllGroupsByFolderId = async (folderId) => {
    const result = await getFetcher("GET", '' , `/question-group/getByfolderId/${folderId}`);
    return result;
}

export default fetchAllGroupsByFolderId
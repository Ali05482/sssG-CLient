import getFetcher from "../../../services/getFetcher"
const getAllFolder = async () => {
    const result = await getFetcher("GET", '' , "/question-folder/getAll");
    return result;
}

export default getAllFolder
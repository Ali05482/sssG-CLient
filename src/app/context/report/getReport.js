import getFetcher from "../../services/getFetcher"


const getReport = async (id) => {
    const result = await getFetcher("GET", '', `/reports/getReport/${id}`,);
    return result;
}

export default getReport
import getFetcher from "../../services/getFetcher"


const getAllAttendants = async () => {
    const result = await getFetcher("GET", '' , "/user/attendant/getAll");
    return result;
}

export default getAllAttendants
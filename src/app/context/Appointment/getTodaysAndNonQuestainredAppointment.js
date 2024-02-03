import getFetcher from "../../services/getFetcher"

const getTodaysAndNonQuestainredAppointment = async () => {
    const result = await getFetcher("GET", '' , "/appointment/getTodaysAndNonQuestainredAppointment");
    return result;
}

export default getTodaysAndNonQuestainredAppointment
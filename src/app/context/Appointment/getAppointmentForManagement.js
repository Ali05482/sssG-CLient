import _ from "lodash";
import getFetcher from "../../services/getFetcher"

const getAppointmentForManagement = async (type = "all", keyword = undefined, fromDate = undefined, toDate = undefined,skipDate = false ) => {
    const result = await getFetcher("GET", '', `/appointment/getAppointmentForManagement/${type}/${(_?.isEmpty(keyword) ? undefined : keyword)}/${(_?.isEmpty(fromDate) ? undefined : fromDate)}/${(_?.isEmpty(toDate) ? undefined : toDate)}/${skipDate}`);
    return result;
}

export default getAppointmentForManagement
import getFetcher from "../../services/getFetcher"


const getDoctorsForApointments = async (dayName, time, clinic,duration,date) => {
    const result = await getFetcher("GET", '' , `/appointment/doctor/${dayName}/${time}/${clinic}/${duration}/${date}`);
    return result;
}

export default getDoctorsForApointments
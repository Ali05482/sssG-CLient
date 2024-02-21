import fetcher from "../../services/fetcher";

const createAndUpdateDoctorNote = async (data, type) => {
    const result = await fetcher("POST", data, "/appointment/createAndUpdateDoctorNote", type);
    return result;
};

export default createAndUpdateDoctorNote;

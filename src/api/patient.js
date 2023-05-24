import { client } from ".";

export const createPatient = async (patient) => {
    const { data } = await client.post("/patient", patient, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const getAllPatients = async () => {
    const {data} = await client.get("/patient");

    return data;
}

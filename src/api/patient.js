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
    const { data } = await client.get("/patient");

    return data;
};

export const searchPatient = async (firstname, lastname) => {
    const { data } = await client.get("/patient/search", {
        params: {
            firstname: firstname.trim() === "" ? null : firstname.trim(),
            lastname: lastname.trim() === "" ? null : lastname.trim(),
        },
    });

    return data;
};

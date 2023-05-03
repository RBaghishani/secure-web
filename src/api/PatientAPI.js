import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchPatients = async () => {
  try {
    const response = await api.get("/api/v1/patient");
    const patients = response.data;
    console.log(patients);
    return patients;
  } catch (err) {
    console.error(err);
  }
};

export const createPatient = async (patient) => {
  try {
    const response = await api.post("/api/v1/patient", patient);
    const createdPatient = response.data;
    console.log(createdPatient);
    return createdPatient;
  } catch (err) {
    console.error(err);
  }
};

export const updatePatient = async (id, patient) => {
  try {
    const response = await api.patch(`/api/v1/patient/${id}`, patient);
    const updatedPatient = response.data;
    console.log(updatedPatient);
    return updatedPatient;
  } catch (err) {
    console.error(err);
  }
};

export const deletePatient = async (id) => {
  try {
    await api.delete(`/api/v1/patient/${id}`);
    console.log(`Patient with id ${id} deleted successfully.`);
  } catch (err) {
    console.error(err);
  }
};

export const findPatients = async (firstname, lastname) => {
  try {
    firstname = firstname.trim();
    lastname = lastname.trim();
    if (firstname === "") {
      firstname = null;
    }
    if (lastname === "") {
      lastname = null;
    }
    const response = await api.get(`/api/v1/patient/search`, {
      params: {
        firstname, lastname
      },
    });

    const patients = response.data;
    return patients;
  } catch (err) {
    console.error(err);
  }
}

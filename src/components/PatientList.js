import React, { useState, useEffect } from "react";
import UpdatePatient from "./UpdatePatient";
import {deletePatient, fetchPatients} from "../api/PatientAPI";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [patientToUpdate, setPatientToUpdate] = useState(null);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async ()=>{
    setPatients(await fetchPatients());
  }
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }
    try {
      await deletePatient(id);
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>
        Patient List
        <button
        onClick={()=>{getPatients()}}
        >
          Reload
        </button>
      </h2>
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Date of Birth</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {patients.map((patient) => (
          <React.Fragment key={patient.id}>
            <tr>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
              <td>{patient.gender}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.address}</td>
              <td>{patient.dob}</td>
              <td>{patient.email}</td>
              <td>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
                <button onClick={() => setPatientToUpdate(patient)}>Update</button>
              </td>
            </tr>
            {patientToUpdate && patientToUpdate.id === patient.id && (
              <tr>
                <td colSpan="8">
                  <UpdatePatient
                    patient={patientToUpdate}
                    onUpdate={(updatedPatient) => {
                      if (updatedPatient) {
                        setPatients(
                          patients.map((p) =>
                            p.id === updatedPatient.id ? updatedPatient : p
                          )
                        );
                      }
                      setPatientToUpdate(null);
                    }}
                  />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;

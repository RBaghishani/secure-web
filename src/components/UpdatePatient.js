import React, { useState, useEffect } from "react";
import axios from "axios";
import {updatePatient} from "../api/PatientAPI";

function UpdatePatient({ patient, onUpdate }) {
  const [updatedPatient, setUpdatedPatient] = useState(patient);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatePatient(patient.id, updatedPatient);
      onUpdate(updatedPatient);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Patient</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstname"
          value={updatedPatient.firstname}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastname"
          value={updatedPatient.lastname}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Gender:
        <select
          name="gender"
          value={updatedPatient.gender}
          onChange={handleChange}
          required
        >
          <option value="">--Choose Gender--</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          name="phoneNumber"
          value={updatedPatient.phoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Address:
        <textarea
          name="address"
          value={updatedPatient.address}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={updatedPatient.dob}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={updatedPatient.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Update</button>
      <button type="button" onClick={() => onUpdate(null)}>
        Cancel
      </button>
    </form>
  );
}

export default UpdatePatient;

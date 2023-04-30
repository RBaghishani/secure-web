import React, { useState } from "react";
import axios from "axios";
import {createPatient} from "../api/PatientAPI";

function NewPatient() {
  const [patient, setPatient] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    phoneNumber: "",
    address: "",
    dob: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPatient((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!patient.agree) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    try {
      await createPatient(patient);
      alert("Patient created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error occurred while creating patient");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Patient</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstname"
          value={patient.firstname}
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
          value={patient.lastname}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" value={patient.gender} onChange={handleChange} required>
          <option value="">--Choose Gender--</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="NOT-BINARY">Other</option>
        </select>
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          name="phoneNumber"
          value={patient.phoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Address:
        <textarea
          name="address"
          value={patient.address}
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
          value={patient.dob}
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
          value={patient.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={patient.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        agree with terms
        <input
          type="checkbox"
          name="agree"
          checked={patient.agree}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Create</button>
    </form>
  );
}

export default NewPatient;
import React from "react";
import { Form, ProgressBar } from "react-bootstrap";
import { useStrengthChecker } from "../hooks/useStrengthChecker";

function PatientForm({ handleChange, patient, requiredPassword = false }) {
  const { strength, label } = useStrengthChecker(patient.password);

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label> First Name: </Form.Label>
        <Form.Control
          type="text"
          name="firstname"
          value={patient.firstname}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Last Name: </Form.Label>
        <Form.Control
          type="text"
          name="lastname"
          value={patient.lastname}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Gender: </Form.Label>
        <Form.Select
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          required
        >
          <option value="">--Choose Gender--</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="NON_BINARY">Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Phone: </Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={patient.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Address: </Form.Label>
        <Form.Control
          as="textarea"
          name="address"
          value={patient.address}
          onChange={handleChange}
          rows="3"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Date of Birth: </Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={patient.dob}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Email: </Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={patient.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          className="mb-3"
          value={patient.password}
          onChange={handleChange}
          required={requiredPassword}
        />
        <ProgressBar variant="primary" now={strength} max={5} label={label} />
      </Form.Group>
    </>
  );
}

export default PatientForm;

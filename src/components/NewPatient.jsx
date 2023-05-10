import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { createPatient } from "../api/PatientAPI";
import PatientForm from "./PatientForm";
import { useStrengthChecker } from '../hooks/useStrengthChecker';

function NewPatient() {
  const [avatar, setAvatar] = useState(null);
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

  const { strength } = useStrengthChecker(patient.password)

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "checkbox") {
      setPatient((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (type === "file") {
      console.log(files)
      /*setPatient((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));*/
      setAvatar(files[0]);
    } else {
      setPatient((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!patient.agree) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    if (strength < 3) {
      alert("Your password isn't strong enough")
      return;
    }
    
    try {
      const createdPatient = await createPatient({...patient, avatar});
      alert("Patient created successfully!");
      // history.push(`/patients/${createdPatient.id}`);
    } catch (err) {
      console.error(err);
      alert("Error occurred while creating patient");
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="6">
          <Form onSubmit={handleSubmit}>
            <h2 className="mb-4">Create New Patient</h2>
            <PatientForm
              patient={patient}
              handleChange={handleChange}
              requiredPassword
            />
            <Form.Group className="mb-3">
              <Form.Check
                id="agree"
                type="checkbox"
                name="agree"
                label=" agree with terms "
                checked={patient.agree}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button size="lg" type="submit" className="ms-auto">
                Create
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewPatient;

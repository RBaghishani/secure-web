import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PatientForm from "./PatientForm";

function UpdatePatient({ patient, onUpdate, show, setShow }) {
  const [updatedPatient, setUpdatedPatient] = useState(patient);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUpdatedPatient((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onUpdate(updatedPatient);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <PatientForm patient={updatedPatient} handleChange={handleChange} />

          <div className="d-flex justify-content-end gap-2">
            <Button
              onClick={() => setShow(false)}
              variant="secondary"
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdatePatient;

import React, { useState, useEffect } from "react";
import UpdatePatient from "./UpdatePatient";
import {
  deletePatient,
  fetchPatients,
  findPatients,
  updatePatient,
} from "../api/PatientAPI";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [patientToUpdate, setPatientToUpdate] = useState(null);
  const [firstnameQuery, setFirstnameQuery] = useState("");
  const [lastnameQuery, setLastnameQuery] = useState("");

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    setPatients(await fetchPatients());
  };

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

  const handleUpdate = async (patientId, updatedPatient) => {
    if (updatedPatient) {
      await updatePatient(updatedPatient.id, updatedPatient);

      setPatients(
        patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
      );
    }
    setPatientToUpdate(null);
  };

  const handleSearch = async (ev) => {
    ev.preventDefault();

    setPatients(await findPatients(firstnameQuery, lastnameQuery));
  };

  const handleClear = async (ev) => {
    setFirstnameQuery("");
    setLastnameQuery("");
    setPatients(await findPatients("", ""));
  }

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Row className="mb-4 gx-2">
          <Col>
            <h2>Patient List</h2>
          </Col>
          <Col xs="2">
            <Form.Control
              value={firstnameQuery}
              onChange={(ev) => setFirstnameQuery(ev.target.value)}
              placeholder="Search firstname..."
              type="text"
            />
          </Col>

          <Col xs="2">
            <Form.Control
              value={lastnameQuery}
              onChange={(ev) => setLastnameQuery(ev.target.value)}
              placeholder="Search lastname..."
              type="text"
            />
          </Col>

          <Col xs="1">
            <Button className="w-100" type="submit">
              Search
            </Button>
          </Col>
          <Col xs="1">
            <Button className="w-100" type="button" variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

      <Table style={{ tableLayout: "fixed" }}>
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
          {patients &&
            patients.map((patient) => (
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
                    <Button
                      onClick={() => handleDelete(patient.id)}
                      size="sm"
                      variant="danger"
                    >
                      Delete
                    </Button>
                    
                    <Link
                      to={`/patient/${patient.id}`}
                      className="btn btn-primary btn-sm ms-2"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
                <UpdatePatient
                  patient={patient}
                  show={patientToUpdate && patientToUpdate.id === patient.id}
                  setShow={(show) => setPatientToUpdate(show ? patient : null)}
                  onUpdate={(updatedPatient) =>
                    handleUpdate(patient.id, updatedPatient)
                  }
                />
              </React.Fragment>
            ))}

          {(!patients || patients.length === 0) && (
            <tr>
              <td colSpan={8} className="text-muted">
                No patient found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default PatientList;
